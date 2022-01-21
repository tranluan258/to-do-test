const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.jwt")
const todoController  =  require("../controller/to-do.controller")

router.post("/ADD-TO-DO", auth, todoController.addTodo)

router.put("/UPDATE-TO-DO", auth, todoController.updateTodo)

router.delete("/REMOVE-TO-DO", auth, todoController.removeTodo)

router.get("/GET-ALL-TO-DO", auth, todoController.getAllTodo)

router.get("/GET-TO-DO-BY-ID", auth, todoController.getTodoById)

router.put("/ASSIGN-TO-DO", auth, todoController.assignTodo)

router.get("/GET-ALL-TASK-BY-USER", auth, todoController.getAllTasksByUser)

module.exports = router