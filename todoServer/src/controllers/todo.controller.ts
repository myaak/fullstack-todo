import { NextFunction, Request, Response } from "express";
const todoService = require("../services/todo.service");

class TodoController {
  async getAllTodos(_: Request, res: Response, next: NextFunction) {
    try {
      const allTodos = await todoService.getAllTodos();
      res.status(200).json(allTodos);
    } catch (e) {
      next(e);
    }
  }

  async addNewTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const newTodo = await todoService.addNewTodo(title);
      res.status(200).json(newTodo);
    } catch (e) {
      next(e);
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const isTodoDeleted = await todoService.deleteTodo(Number(id));

      res.status(200).json({ successful: isTodoDeleted });
    } catch (e) {
      next(e);
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { isForce, params, todo } = req.body;
      const isTodoUpdated = await todoService.updateTodo(isForce, params, todo);

      res.status(200).json(isTodoUpdated);
    } catch (e) {
      next(e);
    }
  }

  async addNewGroupToTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { todo, groupId } = req.body;
      const updatedTodo = await todoService.addNewGroupToTodo(todo, groupId);

      res.status(200).json(updatedTodo);
    } catch (e) {
      next(e);
    }
  }
  async deleteGroupFromTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { todo, groupId } = req.body;
      const updatedTodo = await todoService.deleteGroupFromTodo(todo, groupId);

      res.status(200).json(updatedTodo);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodoController();
