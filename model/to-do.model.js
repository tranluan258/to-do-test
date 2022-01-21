const {getRepository} = require('typeorm')

module.exports = {
    adTodo: async function (id, name,description, dateCompletion){
        const todoRepository = getRepository("To-do")

        let newDateComplete = dateCompletion.replace(/(\d+[/])(\d+[/])/, '$2$1');
        let newTodo = {
            id: id,
            name: name,
            description: description,
            dateCompletion: new Date(newDateComplete),
            dateCreations: new Date(),
            dateModifications: new Date(),
        }
        let result = await todoRepository.save(newTodo)
        if(result) {
            return {
                code:  1,
                message: "Add to do success",
                todo: result
            }
        }

        return {
            code:  0,
            message: "Add to do failed"
        }
    },

    updateTodo: async function (id){
        const todoRepository = getRepository("To-do")

        let todo = await todoRepository.findOne(id);
        if(todo) {
            if(todo.status === "NEW"){
                let result = 
                await todoRepository
                            .createQueryBuilder()
                            .update("To-do")
                            .set({status: "COMPLETE", dateModifications: new Date()})
                            .where("id =:id", {id : id})
                            .execute();
                if(result.affected > 0){
                    return {
                        code:  1,
                        message: "Todo update success",
                    }
                }
            }
            return {
                code: 2,
                message: "Status to do COMPLETE"
            }
        }

        return {
            code:  0,
            message: "Todo not found",
        }
    },
    removeTodo: async function (id){
        const todoRepository = getRepository("To-do")

        let todo = await todoRepository.findOne(id);
        if(todo) {
            if(todo.status === "NEW"){
                let result = 
                await todoRepository
                        .createQueryBuilder()
                        .delete()
                        .from("To-do")
                        .where("id = :id", { id: id })
                        .execute();
                if(result.affected > 0){
                    return {
                        code:  1,
                        message: "Todo remove success",
                    }
                }
            }
            return {
                code: 2,
                message: "Status to do COMPLETE"
            }
        }

        return {
            code:  0,
            message: "Todo not found",
        }
    },

    getAllTodo: async function (){
        const todoRepository = getRepository("To-do")
        let result = await todoRepository.find();
        return result;
    },

    getTodoById: async function (id) {
        const todoRepository = getRepository("To-do")
        let todo = await todoRepository.findOne({id: id})
        if(todo){
            return {
                code: 1,
                todo: todo
            }
        }

        return {
            code: 0,
            todo: null
        }
    },

    assignTodo: async function (id, userId){
        const todoRepository = getRepository("To-do")
        let todo = await todoRepository.findOne({id: id})
        if(todo){
            let result = 
            await todoRepository
                    .createQueryBuilder()
                    .update("To-do")
                    .set({userId: userId, dateModifications: new Date()})
                    .where("id =:id", {id : id})
                    .execute();
            if(result.affected > 0){
                return {
                    code:  1,
                    message: "Todo assign success",
                }
            }
        }

        return {
            code: 0,
            message: "Todo not found"
        }
    },
    getAllTasksByUser: async function (userId) {
        const todoRepository = getRepository("To-do")
        const result = await todoRepository.find({ userId: userId })
        return result;
    }
}