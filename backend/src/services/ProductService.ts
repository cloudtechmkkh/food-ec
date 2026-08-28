import { db } from '../utils/db';

const ProductService = {
    async getProducts(query: any) {
        const {
            categoryId,
            temperatureZone,
            expireBefore,
            allergyExclude,
            limit = 50,
            offset = 0,
        } = query;

        let sql = `
        SELECT
        p.id,
        p.name,
        p.price,
        p.temperature_zone,
        p.ingredients,
        p.allergies,
        p.nutrition_json,
        l.expire_at,
        l.lot_no
        FROM products p
        LEFT JOIN lots l ON p.id = l.product_id
        WHERE 1 = 1
        `;

        const params: any[] = [];

        if (categoryId) {
            sql += ` AND p.category_id = ?`;
            params.push(categoryId);
        }

        if (temperatureZone) {
            sql += ` AND p.temperature_zone = ?`;
            params.push(temperatureZone);
        }

        if (expireBefore) {
            sql += ` AND l.expire_at <= ?`;
            params.push(expireBefore);
        }

        if (allergyExclude) {
            sql += ` AND (p.allergies IS NULL OR p.allergies NOT LIKE ?)`;
            params.push(`%${allergyExclude}%`);
        }

        sql += ` LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));

        const [rows] = await db.query(sql, params);
        return rows;
    },

    async getProductDetail(productId: number) {
        const sql = `
        SELECT
        p.id,
        p.name,
        p.price,
        p.temperature_zone,
        p.ingredients,
        p.allergies,
        p.nutrition_json,
        c.name AS category_name,
        l.lot_no,
        l.manufactured_at,
        l.expire_at,
        l.stock AS lot_stock
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN lots l ON p.id = l.product_id
        WHERE p.id = ?
        LIMIT 1
        `;

        const [rows]: any = await db.query(sql, [productId]);
        return rows[0] || null;
    }
};

export default ProductService;