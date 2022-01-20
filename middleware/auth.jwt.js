const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const {JWT_SECRET} = process.env;
    let token = req.header("Authorization").split(" ")[1];
    if(!token) {
        return  res.status(300).json({message: "Vui lòng cung cấp token"})
     }
 
     jwt.verify(token, JWT_SECRET, (err, data) => {
         if(err) {
             return res.status(300).json({message: "Token sai hoặc đã hết hạn"})
         }
         req.user = data;
         next()
     })
}