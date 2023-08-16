// @ts-ignore
const router = require("express").Router();
const todoGroupController = require("../controllers/todoGroup.controller");

router.get("/", todoGroupController.getAllGroups);
router.get("/with", todoGroupController.getSpecificGroupsWithValues);
router.get("/without", todoGroupController.getSpecificGroupsWithoutValues);
router.post("/", todoGroupController.addNewGroup);
router.delete("/");

module.exports = router;
