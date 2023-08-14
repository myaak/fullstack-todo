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

  async getSpecificGroupsWithValues(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = req.query.groups !== undefined ? (req.query.groups as string[]) : undefined; // не понимаю почему видит только первое объявление фигня какая-то
      const specificGroups: TodoGroup[] = await todoGroupService.getSpecificGroupsWithValues(groups?.map(Number));
      res.status(200).json(specificGroups);
    } catch (e) {
      next(e);
    }
  }

  async getSpecificGroupsWithoutValues(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = req.query.groups !== undefined ? (req.query.groups as string[]) : undefined; // не понимаю почему видит только первое объявление фигня какая-то
      const specificGroups: TodoGroup[] = await todoGroupService.getSpecificGroupsWithoutValues(groups?.map(Number));
      res.status(200).json(specificGroups);
    } catch (e) {
      next(e);
    }
  }

  async addNewGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, color, hoverColor } = req.body;
      const newGroup = await todoGroupService.addNewGroup(title, color, hoverColor);
      res.status(200).json(newGroup);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodoGroupController();
