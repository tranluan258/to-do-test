const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller")

router.post("/SIGN-UP", userController.addUser)

module.exports = router;