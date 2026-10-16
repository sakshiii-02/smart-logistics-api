const db = require("../db");

const getAllShipments = async ({ page, limit, search, status }) => {
    let conditions = [];
    
    if(search) {
        conditions.push(`(tracking_number ILIKE '%${search}%') or (customer_name ILIKE '%${search}%')`);
    }

    if(status) {
        conditions.push(`status = '${status}'`);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    let pagination = '';
    pagination = `LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
    const query = `
        SELECT
            id,
            tracking_number AS "trackingNumber",
            customer_name AS "customerName",
            status,
            created_at AS "createdAt"
        FROM shipments
        ${whereClause}
        ORDER BY id DESC 
        ${pagination}
    `;

    const result = await db.query(query);
    return result.rows;
};

const createNewShipments = async (trackingNumber, customerName) => {
    const query = `
        INSERT INTO shipments (tracking_number, customer_name)
        VALUES ($1, $2)
        RETURNING
            id,
            tracking_number AS "trackingNumber",
            customer_name AS "customerName",
            status,
            created_at AS "createdAt"
    `;

    const result = await db.query(query, [
        trackingNumber,
        customerName
    ]);

    return result.rows[0];
};

module.exports = {
    getAllShipments,
    createNewShipments
}