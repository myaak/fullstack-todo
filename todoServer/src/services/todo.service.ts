import { pool } from "../database/database";
import { TodoDTO, TodoGroup } from "../models/todoDTO";
import { AtLeastOne } from "../models/helperTypes";
import { UpdateTodoParameters } from "../models/updateTodoParameters";
import { areObjectsEqual } from "./helpers";
class TodoService {
  async getAllTodos(): Promise<TodoDTO[]> {
    const getAllTodos = await pool.query(
      "SELECT TL.id, TL.title, TL.completed, COALESCE((SELECT ARRAY_AGG(todo_group_id) FROM TODO_AND_GROUPS WHERE todo_id = TL.id), '{}'::INTEGER[]) AS todo_groups FROM TODOLIST TL ORDER BY ID;",

      []
    );

    const allTodos: TodoDTO[] = getAllTodos.rows;

    return allTodos;
  }
  async addNewTodo(title: string): Promise<TodoDTO> {
    const insertNewTodo = await pool.query("INSERT INTO TODOLIST(TITLE) VALUES($1) RETURNING *", [title]);

    const newTodo: TodoDTO = {
      ...insertNewTodo.rows[0],
      todo_groups: []
    };
    return newTodo; // вернуть один элемент
  }

  async deleteTodo(id: number): Promise<boolean> {
    try {
      await pool.query("DELETE FROM TODOLIST WHERE ID = $1", [id]);
      return true;
    } catch {
      return false;
    }
  }

  async checkChanges(todo: TodoDTO): Promise<boolean> {
    const getTodoItem = await pool.query("SELECT * FROM TODOLIST WHERE ID = $1", [todo.id]);
    const todoItem: TodoDTO = getTodoItem.rows[0];
    return areObjectsEqual(todoItem, todo);
  }

  async updateTodo(params: AtLeastOne<UpdateTodoParameters>, todo: TodoDTO): Promise<string> {
    try {
      if (!(await this.checkChanges(todo))) {
        return "request changes";
      }

      let queryOptions = "";
      const entries = Object.entries(params);

      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        queryOptions += `${key.toUpperCase()} = ${
          typeof value === "string" ? `'${value}'` : `${String(value).toUpperCase()}`
        }`;

        if (i < entries.length - 1) {
          queryOptions += ",";
        }
      }

      await pool.query(`UPDATE TODOLIST SET ${queryOptions} WHERE ID = $1`, [todo.id]);
      return "success";
    } catch {
      return "error";
    }
  }

  async addNewGroupToTodo(todo: TodoDTO, groupId: TodoGroup["id"]): Promise<TodoDTO> {
    const { id, todo_groups } = todo;
    await pool.query("INSERT INTO TODOS_AND_GROUPS(TODO_ID, TODO_GROUP_ID) VALUES($1, $2)", [id, groupId]);

    const updatedTodo: TodoDTO = {
      ...todo,
      todo_groups: [...todo_groups, groupId]
    };

    return updatedTodo;
  }
}

module.exports = new TodoService();
