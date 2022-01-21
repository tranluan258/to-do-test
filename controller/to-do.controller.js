const todoModel = require("../model/to-do.model");
const uuid = require("short-uuid");

module.exports = {
    addTodo: async function (req, res) {
        const {name,description,dateCompletion} = req.body;
        if(name && description && dateCompletion) {
            let {code,message,todo} = await todoModel.adTodo(uuid.generate() ,name, description, dateCompletion);
            if (code === 0) {
                return res.status(400).json({statusCode: 400, message: "Add todo failed" });
            } else if (code === 1) {
                return res.status(200).json({ statusCode: 200, message: "Add todo success", todo: todo});
            } 
        }
        return res.status(400).json({message: "Please enter full information:  name, description, dateCompletion"})
    },
    updateTodo: async function (req, res) {
        const {id} = req.body
        if(id && id.length > 0){
            let {code} = await todoModel.updateTodo(id);
            if (code === 0) {
                return res.status(400).json({statusCode: 400, message: "Todo not found" });
            } else if (code === 1) {
                return res.status(200).json({ statusCode: 200, message: "Update todo success"});
            }else if(code === 2) {
                return res.status(400).json({statusCode: 400, message: "Status todo is COMPLETE" });
            }
        }
        return res.status(400).json({message: "Please enter id"})
    },
    removeTodo: async function (req, res) {
        const {id} = req.body
        if(id && id.length > 0){
            let {code} = await todoModel.removeTodo(id);
            if (code === 0) {
                return res.status(400).json({statusCode: 400, message: "Todo not found" });
            } else if (code === 1) {
                return res.status(200).json({ statusCode: 200, message: "Remove todo success"});
            }else if(code === 2) {
                return res.status(400).json({statusCode: 400, message: "Status todo is COMPLETE" });
            }
        }
        return res.status(400).json({message: "Please enter id"})
    },

    getAllTodo: async function (req, res) {
        let result = await todoModel.getAllTodo();
        res.status(200).json({statusCode: 200, message:"Success", listTodo: result});
    },

    getTodoById: async function (req, res){
        const {id} = req.body;
        if(id && id.length > 0){
            let {code,todo} = await todoModel.getTodoById(id);
            if (code === 0) {
                return res.status(400).json({statusCode: 400, message: "Todo not found" });
            } else if (code === 1) {
                return res.status(200).json({ statusCode: 200, message: "Get todo success",todo: todo});
            }
        }
        return res.status(400).json({statusCode: 400, message: "Please enter id"})
    },

    assignTodo: async function (req, res) {
        const {userId,id} = req.body;
        const idUserCurrent = req.user.id;
        if(userId && id && userId.length > 0 && id.length > 0) {
            if(idUserCurrent === userId){
                return res.status(400).json({statusCode: 400, message: "Can't assign tasks to myself"})
            }
            let {code} = await todoModel.assignTodo(id,userId);
            if (code === 0) {
                return res.status(400).json({statusCode: 400, message: "Todo not found" });
            } else if (code === 1) {
                return res.status(200).json({ statusCode: 200, message: "Assign todo success"});
            }
        }
        return res.status(400).json({statusCode: 400, message: "Please enter id and userId"})
    },

    getAllTasksByUser: async function (req, res) {
        const {userId} = req.body
        if(userId && userId.length > 0){
            const result = await todoModel.getAllTasksByUser(userId)
            return res.status(200).json({ statusCode: 200, message: "Get task success",listTask: result});
        }

        return res.status(400).json({statusCode: 400, message: "Please enter  userId"})
    }
}