const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.jwt")

router.post("/ADD-TO-DO", auth, function (req, res) {
    
    res.json({message:"Add to do"})
})

module.exports = router