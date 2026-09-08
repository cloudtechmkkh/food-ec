import { db } from '../utils/db';

const AdminService = {
    async getOrders() {
        const [rows] = await db.query(
            `
            SELECT 
                o.id,
                u.name AS user_name,
                o.total_price,
                o.status,
                o.created_at
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.created_at DESC
            `
        );

        return rows;
    },

    async getOrderDetail(orderId: number) {
        // 注文情報
        const [orderRows]: any = await db.query(
            `
            SELECT
                o.id,
                o.total_price,
                o.status,
                o.created_at,
                u.name AS user_name,
                a.postal_code,
                a.prefecture,
                a.city,
                a.address_line,
                a.phone
            FROM orders o
            JOIN users u ON o.user_id = u.id
            JOIN addresses a ON o.address_id = a.id
            WHERE o.id = ?
            `,
            [orderId]
        );

        if (orderRows.length === 0) return null;

        const order = orderRows[0];

        // 注文商品
        const [items]: any = await db.query(
            `
            SELECT
                oi.product_id,
                p.name,
                p.temperature_zone,
                oi.quantity,
                oi.price
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
            `,
            [orderId]
        );

        order.items = items;

        return order;
    },

    async getProducts() {
        const [rows] = await db.query(
            `
            SELECT
                p.id,
                p.name,
                p.price,
                p.temperature_zone,
                c.name AS category_name,
                p.created_at
            FROM products p
            JOIN categories c ON p.category_id = c.id
            ORDER BY p.created_at DESC
            `
        );

        return rows;
    },

    async updateProduct(id: number, body: any) {
        const { name, price, temperature_zone, category_id, ingredients, allergies } = body;

        await db.query(
            `
            UPDATE products SET
                    name = ?,
                    price = ?,
                    temperature_zone = ?,
                    category_id = ?,
                    ingredients = ?,
                    allergies = ?
            WHERE id = ?
            `,
            [name, price, temperature_zone, category_id, ingredients, allergies, id]
        );

        const [rows]: any = await db.query(
            `
            SELECT * FROM products WHERE id = ?
            `,
            [id]
        );

        return rows[0];
    }
};

export default AdminService;