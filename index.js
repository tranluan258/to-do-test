require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 8080
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({message: "Welcome to to-do api"})
})

app.listen(PORT, () => console.log("Api listen port: "+ PORT))