const userModel = require("../model/user.model");
const uuid = require("short-uuid");
const jwt = require("jsonwebtoken");

module.exports = {
    signUp: async function (req, res) {
        const { username, password } = req.body;
        if (username && password) {
            if (username.length > 0 && password.length > 0) {
                let id = uuid.generate();
                let {code, user} = await userModel.signUp(id, username, password);

                if (code === 0) {
                    return res.status(400).json({ message: "User already exists" });
                } else if (code === 1) {
                    return res.status(200).json({ message: "Sign-up user success"});
                } else if (code === 2) {
                    return res.status(400).json({ message: "Sign-up user failed" });
                }
            } else {
                return res
                    .status(400)
                    .json({ message: "Please type a username and password" });
            }
        } else {
            return res
                .status(400)
                .json({ message: "Please type a username and password" });
        }
    },

    signIn: async function (req, res) {
        const { username, password } = req.body;
        if (username && password) {
            if (username.length > 0 && password.length > 0) {
               let {code,user} = await userModel.signIn(username, password);
               if (code === 0) {
                    return res.status(400).json({ message: "Sign-in user failed" });
                } else if (code === 1) {
                    const {JWT_SECRET} = process.env;
                    jwt.sign({ 
                        username: user.username,
                    },JWT_SECRET,{
                        expiresIn: "1h"
                    },(error,token) => {
                        if(error) throw error;
                        return res.status(200).json({ message: "Sign-in user success", token: token });
                    })
                } else if (code === 2) {
                    return res.status(400).json({ message: "Sign-in user failed" });
                }
            } else {
                return res
                    .status(400)
                    .json({ message: "Please type a username and password" });
            }
        } else {
            return res
                .status(400)
                .json({ message: "Please type a username and password" });
        }
    }
};
