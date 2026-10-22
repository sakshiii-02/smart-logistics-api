const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controller/userController");
const validateRequest = require("../middleware/validateRequest");
const { userCreation, userLogin } = require("../validator/userValidator");

router.post("/registerUser", validateRequest({body:userCreation}), registerUser);
router.post("/loginUser", validateRequest({body:userLogin}), loginUser);

module.exports = router;