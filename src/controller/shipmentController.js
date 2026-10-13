const { errorMessages } = require("vue/compiler-sfc");
const shipmentModel = require("../models/shipmentModel");

const getAllShipments = async(req, res) => {
    try {
        const shipments = await shipmentModel.getAllShipments();

        return res.status(200).json({
            success: true,
            count: shipments.length,
            data: shipments
        });
    } catch (error) {
        return res.json({
            error: error,
            msg: error.message
        })
    }
};

const createShipment = async (req, res) => {
    try{
        const { trackingNumber, customerName } = req.body;

        if (
            typeof trackingNumber !== "string" ||
            !trackingNumber.trim() ||
            typeof customerName !== "string" ||
            !customerName.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid trackingNumber and customerName are required"
            });
        }

        const shipment = await shipmentModel.createNewShipments(
            trackingNumber.trim(),
            customerName.trim()
        );

        return res.status(201).json({
            success: true,
            message: "Shipment created successfully",
            data: shipment
        });
    }
    catch(error){
        return res.json({
            error: error,
            msg: error.message
        })
    }
};

module.exports = {
    getAllShipments,
    createShipment
};
