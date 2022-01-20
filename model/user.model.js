const {getRepository} = require('typeorm')
const hash = require("bcrypt")


module.exports = {
    signUp: async function(id, username, password) {
        const userRepository = getRepository("User");
        const user = await userRepository.findOne({ username: username });
        if(user) {
            return  {code: 0, user: null};
        }else {
            let hashPassword = hash.hashSync(password,5);
            let newUser = {
                id: id,
                username: username,
                password: hashPassword
            }
            let result = await userRepository.save(newUser);
            if(result){
                return  {code: 1, user: result};
            }else {
                return  {code: 2, user: null};
            }     
        }
    },

    signIn: async function(username,password){
        const userRepository = getRepository("User");
        const user = await userRepository.findOne({username: username});
        if(user) {
            let match = hash.compareSync(password,user.password)
            if(match) {
                return {code: 1, user: user};
            }
            return   {code: 2, user: null};;
        }
        return {code: 0, user: null};
    }
}