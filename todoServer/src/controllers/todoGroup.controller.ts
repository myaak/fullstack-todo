import { TodoGroup } from "models/todoDTO";
import { NextFunction, Request, Response } from "express";

const todoGroupService = require("../services/todoGroup.service");
class TodoGroupController {
  async getAllGroups(_: Request, res: Response, next: NextFunction) {
    try {
      const allGroups: TodoGroup[] = await todoGroupService.getAllGroups();
      res.status(200).json(allGroups);
    } catch (e) {
      next(e);
    }
  }

  async addNewGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const newGroup = await todoGroupService.addNewGroup(title);
      res.status(200).json(newGroup);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodoGroupController();
