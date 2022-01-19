const userModel = require("../model/user.model");
const uuid = require("short-uuid");
module.exports = {
    addUser: async function (req, res) {
        const { username, password } = req.body;
        if (username && password) {
            if (username.length > 0 && password.length > 0) {
                let id = uuid.generate();
                let result = await userModel.addUser(id, username, password);

                if (result === 0) {
                    return res.status(400).json({ message: "User already exists" });
                } else if (result === 1) {
                    return res.status(200).json({ message: "Sign-up user success" });
                } else if (result === 2) {
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
};
