// @ts-ignore
const router = require("express").Router();
const todoController = require("../controllers/todo.controller");

router.get("/", todoController.getAllTodos);
router.post("/", todoController.addNewTodo);
router.patch("/:id/title", todoController.updateTodoTitle);
router.patch("/:id/completed", todoController.setTodoCompletedStatus);
// в теории вот эти два патча можно в один пихнуть и проверять на optional в body?

module.exports = router;
