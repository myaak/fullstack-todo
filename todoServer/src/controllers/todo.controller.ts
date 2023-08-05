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

  async updateTodoTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const isUpdatedTodo = await todoService.updateTodoTitle(Number(id), title);
      res.json(200).json({ successful: isUpdatedTodo });
    } catch (e) {
      next(e);
    }
  }

  async setTodoCompletedStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const isUpdatedTodoCompletedStatus = await todoService.setTodoCompletedStatus(Number(id), completed);
      res.status(200).json({ successful: isUpdatedTodoCompletedStatus });
    } catch (e) {
      next(e);
    }
  }

  async addNewGroupToTodo(req: Request, res: Response, next: NextFunction) {
    const { todo, groupId } = req.body;
    const updatedTodo = await todoService.addNewGroupToTodo(todo, groupId);
    res.status(200).json(updatedTodo);
    try {
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodoController();
