const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");
router.use(authenticateToken);

const {
    getAllShipments,
    createShipment,
    getShipmentById,
    updateShipmentStatus,
} = require("../controller/shipmentController");

const validateRequest = require("../middleware/validateRequest");

const { shipmentIdParamsSchema, createShipmentBodySchema, updateStatusBodySchema, shipmentListQuerySchema } = require("../validator/shipmentValidator");

// let shipments = [
//     {
//         id: 1,
//         awbnumber : "SHIP1234",
//         customername : "John Doe",
//         shipmentstatus : "In Transit",
//     },
//     {
//         id: 2,
//         awbnumber : "SHIP5678",
//         customername : "Jane Smith",
//         shipmentstatus : "Delivered",
//     }
// ]

// router.get("/shipments", (req, res) => {
//     res.status(200).json({
//         shipmentCount: shipments.length,
//         shipments: shipments
//     })
// });

// router.post("/addNewShipment", (req, res) => {
//     const data = req.body;
//     let newId = shipments.length + 1;
//     data.id = newId;
//     shipments.push(data);
//     res.status(201).json({
//         success: true,
//         message: "New shipment added successfully",
//         shipment: shipments
//     })
// })

router.get("/getAllshipments", authenticateToken, validateRequest({ query: shipmentListQuerySchema }), getAllShipments);
router.post("/addNewShipment", authenticateToken, authorizeRole('admin'), validateRequest({ body: createShipmentBodySchema }), createShipment);

module.exports = router;