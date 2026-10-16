const Joi = require("joi");

const allowedStatuses = [
    "Pending",
    "In Transit",
    "Delivered",
    "Cancelled"
];

const shipmentIdParamsSchema = Joi.object({
    id: Joi.string()
        .pattern(/^[1-9]\d*$/)
        .required()
        .messages({
            "string.pattern.base": "Shipment ID must be a positive integer",
            "any.required": "Shipment ID is required"
        })
});

const createShipmentBodySchema = Joi.object({
    trackingNumber: Joi.string().trim().min(1).max(50).required(),
    customerName: Joi.string().trim().min(1).max(100).required()
});

const updateStatusBodySchema = Joi.object({
    status: Joi.string().valid(...allowedStatuses).required()
});

const shipmentListQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().trim().max(100).allow(""),
    status: Joi.string().valid(...allowedStatuses)
});

module.exports = {
    shipmentIdParamsSchema,
    createShipmentBodySchema,
    updateStatusBodySchema,
    shipmentListQuerySchema
};