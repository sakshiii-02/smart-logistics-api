
let shipments = [
    {
        id: 1,
        trackingNumber: "SHP1001",
        customerName: "Rahul Sharma",
        status: "In Transit"
    },
    {
        id: 2,
        trackingNumber: "SHP1002",
        customerName: "Priya Verma",
        status: "Delivered"
    }
];

const getAllShipments = (req, res) => {
    res.status(200).json({
        success: true,
        count: shipments.length,
        data: shipments
    });
};

const createShipment = (req, res) => {
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

    const duplicate = shipments.some(
        shipment => shipment.trackingNumber === trackingNumber.trim()
    );

    if (duplicate) {
        return res.status(409).json({
            success: false,
            message: "Tracking number already exists"
        });
    }

    const newShipment = {
        id: Date.now(),
        trackingNumber: trackingNumber.trim(),
        customerName: customerName.trim(),
        status: "Pending"
    };

    shipments.push(newShipment);

    return res.status(201).json({
        success: true,
        message: "Shipment created successfully",
        data: newShipment
    });
};

module.exports = {
    getAllShipments,
    createShipment
};
