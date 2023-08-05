// @ts-ignore
const router = require("express").Router();
const todoController = require("../controllers/todo.controller");

router.get("/", todoController.getAllTodos);
router.post("/", todoController.addNewTodo);
router.delete("/:id", todoController.deleteTodo);
router.patch("/:id", todoController.updateTodo);

router.patch("/:id/group", todoController.addNewGroupToTodo);

module.exports = router;
