import { pool } from "../database/database";
class TodoService {
  async getAllTodos() {
    const allTodos = await pool.query(
      "SELECT TL.id, TL.title, TL.completed, ARRAY_AGG(TAG.todo_group_id) AS todo_groups FROM TODOLIST TL LEFT JOIN TODO_AND_GROUPS TAG ON TL.id = TAG.todo_id GROUP BY TL.id, TL.title, TL.completed",
      []
    );

    return allTodos.rows;
  }
  async addNewTodo(title: string) {
    const newTodo = await pool.query("INSERT INTO TODOLIST(TITLE) VALUES($1) RETURNING *", [title]);

    return newTodo.rows[0]; // вернуть один элемент
  }

  async updateTodoTitle(id: number, title: string) {
    const updatedTodo = await pool.query("UPDATE TODOLIST SET TITLE = $1 WHERE ID = $2 RETURNING *", [title, id]);
    return updatedTodo.rows[0];
  }

  async setTodoCompletedStatus(id: number, completed: boolean) {
    const updateCompletedTodoStatus = await pool.query("UPDATE TODOLIST SET COMPLETED = $1 WHERE ID = $2 RETURNING *", [
      completed,
      id
    ]);

    return updateCompletedTodoStatus.rows[0];
  }
}

module.exports = new TodoService();
