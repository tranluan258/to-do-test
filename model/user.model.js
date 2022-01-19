const db = require('../config/db')
const hash = require("bcrypt")

module.exports = {
    addUser: async function(id, username, password) {
        let query ="SELECT * FROM user WHERE username = ?";
        let result = await db.query(query,[username]);
        if(result.values.length > 0) {
            return 0;
        }else {
            query = "INSERT INTO user (id,username, password) VALUES (?, ?,?)";
            let hashPassword = hash.hashSync(password,2);
            let result = await db.query(query,[id,username,hashPassword])
                if(result.values.length > 0){
                    return 1;
                }else {
                    return 2;
                }
        }
    }
}