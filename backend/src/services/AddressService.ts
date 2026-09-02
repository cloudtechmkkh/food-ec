import { db } from '../utils/db';

const AddressService = {
    async getAddresses(userId: number) {
        const [rows] = await db.query(
            `
            SELECT 
            id,
            postal_code,
            prefecture,
            city,
            address_line,
            phone
            FROM addresses
            WHERE user_id = ?
            `,
            [userId]
        );

        return rows;
    }
};

export default AddressService;