import fs from 'fs';
import { db } from '../utils/db';
import Stripe from 'stripe';
import { createDeliveryLabelCsv } from '../utils/delivery';

const stripe = new Stripe(process.env.STRIPE_KEY!, {
    // @ts-ignore
    apiVersion: '2023-10-16'
});

const OrderService = {
    async createOrder(body: any, userId: number) {
        const { items, addressId } = body;

        if(!items || items.length === 0) {
            throw new Error('商品がありません');
        }

        //1. 商品情報とロット在庫チェック
        const orderItems: any[] = [];

        for (const item of items) {
            const [rows]: any = await db.query(
                `
                SELECT p.id, p.name, p.price, l.id AS lot_id, l.stock, l.expire_at
                FROM products p
                LEFT JOIN lots l ON p.id = l.product_id
                WHERE p.id = ?
                LIMIT 1
                `,
                [item.id]
            );

            const product = rows[0];
            if (!product) throw new Error('商品が存在しません');

            if (product.stock < item.quantity) {
                throw new Error(`在庫不足：${product.name}`);
            }

            orderItems.push({
                product_id: product.id,
                quantity: item.quantity,
                price: product.price,
                lot_id: product.lot_id,
            });
        }

        //2. Stripe 決済
        const totalPrice = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,
            currency: 'jpy',
            payment_method: body.paymentMethodId,
            confirm: true,
        });

        if (paymentIntent.status != 'succeeded') {
            throw new Error('決済に失敗しました');
        }

        //3. 注文登録(トランザクション)
        const conn = await db.getConnection();
        await conn.beginTransaction();

        try {
            const [orderResult]: any = await conn.query(
                `
                INSERT INTO orders (user_id, address_id, total_price, status)
                VALUES (?, ?, ?, 'confirmed')
                `,
                [userId, addressId, totalPrice]
            );

            const orderId = orderResult.insertId;

            for (const item of orderItems) {
                await conn.query(
                    `
                    INSERT INTO order_items (order_id, product_id, quantity, price)
                    VALUES (?, ?, ?, ?)
                    `,
                    [orderId, item.product_id, item.quantity, item.price]
                );

                //ロット在庫減算
                await conn.query(
                    `
                    UPDATE lots SET stock = stock - ? WHERE id = ?
                    `,
                    [item.quantity, item.lot_id]
                );
            }

            // 注文情報を取得 (配送ラベル用)
            const [orderRows]: any = await conn.query(
                `
                SELECT o.id, o.user_id, o.address_id, o.created_at
                FROM orders o
                WHERE o.id = ?
                `,
                [orderId]
            );

            const order = orderRows[0];

            // ユーザー情報
            const [userRows]: any = await conn.query(
                `
                SELECT name FROM users WHERE id = ?
                `,
                [userId]
            );
            order.user = userRows[0];

            // 住所情報
            const [addressRows]: any = await conn.query(
                `
                SELECT postal_code, prefecture, city, address_line, phone
                FROM addresses WHERE id = ?
                `,
                [order.address_id]
            );
            order.address = addressRows[0];

            // 商品情報
            const [itemRows]: any = await conn.query(
                `
                SELECT oi.quantity, p.name, p.temperature_zone
                FROM order_items oi
                JOIN produts p ON oi.prodcut_id = p.id
                WHERE oi.order_id = ?
                `,
                [orderId]
            );
            order.items = itemRows;

            // 配送日 (例：翌日)
            order.delivery_date = new Date(Date.now() + 86400000)
                .toISOString()
                .split('T')[0];

            // CSV生成
            const csv = createDeliveryLabelCsv(order);

            // 保存 (任意)
            await fs.promises.writeFile(
                `./delivery_labels/order_${orderId}.csv`,
                csv
            );

            await conn.commit();
            
            return {
                orderId,
                totalPrice,
                status: 'confirmed',
                deliveryLabelPath: `./delivery_labels/order_${orderId}.csv`
            };
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }
};

export default OrderService;