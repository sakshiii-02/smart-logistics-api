const express = require("express");

const router = express.Router();

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

const{getAllShipments,createShipment} = require("../controller/shipmentController");

router.get("/getAllshipments", getAllShipments);
router.post("/addNewShipment", createShipment);

module.exports = router;