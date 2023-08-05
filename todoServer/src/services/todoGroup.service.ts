import { TodoGroup } from "../models/todoDTO";
import { pool } from "../database/database";

class TodoGroupService {
  async getAllGroups(): Promise<TodoGroup[]> {
    const getAllGroups = await pool.query("SELECT * FROM TODO_GROUPS", []);

    const allGroups: TodoGroup[] = getAllGroups.rows;
    return allGroups;
  }

  async addNewGroup(title: TodoGroup["title"]): Promise<TodoGroup> {
    const addNewGroup = await pool.query("INSERT INTO TODO_GROUPS(TITLE) VALUES($1) RETURNING *", [title]);

    const newGroup: TodoGroup = addNewGroup.rows[0];
    return newGroup;
  }
}

module.exports = new TodoGroupService();
