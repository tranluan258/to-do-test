const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller")

router.post("/SIGN-UP", userController.signUp)

router.post("/SIGN-IN", userController.signIn)

module.exports = router;