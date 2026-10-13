const db = require("../db");

const getAllShipments = async () => {
    const query = `
        SELECT
            id,
            tracking_number AS "trackingNumber",
            customer_name AS "customerName",
            status,
            created_at AS "createdAt"
        FROM shipments
        ORDER BY id DESC
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