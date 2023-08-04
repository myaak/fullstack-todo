// @ts-ignore
const router = require("express").Router();
const todo = require("./todo.router");

router.use("/todo", todo);

module.exports = router;
