const {getRepository} = require('typeorm')
const hash = require("bcrypt")

module.exports = {
    addUser: async function(id, username, password) {
        const userRepository = getRepository("User");
        const user = await userRepository.findOne({ username: username });
        if(user) {
            return 0;
        }else {
            let hashPassword = hash.hashSync(password,5);
            let newUser = {
                id: id,
                username: username,
                password: hashPassword
            }
            let result = await userRepository.save(newUser);
            if(result){
                return 1;
            }else {
                return 2;
            }
            
        }
    }
}