// @ts-ignore
const router = require("express").Router();
const todo = require("./todo.router");
const todoGroup = require("./todoGroup.router");

router.use("/todo", todo);
router.use("/group", todoGroup);

module.exports = router;
