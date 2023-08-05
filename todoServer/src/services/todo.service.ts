import { pool } from "../database/database";
import { TodoDTO, TodoGroup } from "../models/todoDTO";
class TodoService {
  async getAllTodos(): Promise<TodoDTO[]> {
    const getAllTodos = await pool.query(
      "SELECT TL.id, TL.title, TL.completed, COALESCE((SELECT ARRAY_AGG(todo_group_id) FROM TODO_AND_GROUPS WHERE todo_id = TL.id), '{}'::INTEGER[]) AS todo_groups FROM TODOLIST TL;",

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

  async updateTodoTitle(id: number, title: string): Promise<boolean> {
    try {
      await pool.query("UPDATE TODOLIST SET TITLE = $1 WHERE ID = $2", [title, id]);
      return true;
    } catch {
      return false;
    }
  }

  async setTodoCompletedStatus(id: number, completed: boolean): Promise<boolean> {
    try {
      await pool.query("UPDATE TODOLIST SET COMPLETED = $1 WHERE ID = $2", [completed, id]);
      return true;
    } catch {
      return false;
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
