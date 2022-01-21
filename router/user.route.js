const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller")
const auth = require("../middleware/auth.jwt")

router.post("/SIGN-UP", userController.signUp)

router.post("/SIGN-IN", userController.signIn)

router.get("/GET-ALL-USER",auth, userController.getAllUsers)

module.exports = router;