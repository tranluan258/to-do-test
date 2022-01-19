require("dotenv").config();
const express = require('express');
const db = require('./config/db');
const PORT = process.env.PORT || 8080;
const app = express();

const userRouter = require('./router/user.route')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.json({message: "Welcome to to-do api"});
})

app.use("/", userRouter);

app.listen(PORT, () => console.log("Api listen port: "+ PORT));