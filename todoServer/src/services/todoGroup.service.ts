import { TodoGroup } from "../models/todoDTO";
import { pool } from "../database/database";

class TodoGroupService {
  async getAllGroups(): Promise<TodoGroup[]> {
    const getAllGroups = await pool.query("SELECT * FROM TODO_GROUPS", []);

    const allGroups: TodoGroup[] = getAllGroups.rows;
    return allGroups;
  }

  async getSpecificGroupsWithValues(groups: number[]): Promise<TodoGroup[]> {
    const getSpecificGroups = await pool.query("SELECT * FROM TODO_GROUPS WHERE ID = ANY($1)", [groups]);

    const specificGroups: TodoGroup[] = getSpecificGroups.rows;
    return specificGroups;
  }

  async getSpecificGroupsWithoutValues(groups: number[]): Promise<TodoGroup[]> {
    console.log(groups);
    const getSpecificGroups = await pool.query("SELECT * FROM TODO_GROUPS WHERE ID != ALL($1::int[])", [groups]);

    const specificGroups: TodoGroup[] = getSpecificGroups.rows;
    return specificGroups;
  }

  async addNewGroup(
    title: TodoGroup["title"],
    color: TodoGroup["color"],
    hoverColor: TodoGroup["hoverColor"]
  ): Promise<TodoGroup> {
    const addNewGroup = await pool.query(
      "INSERT INTO TODO_GROUPS(TITLE, COLOR, hoverColor) VALUES($1, $2, $3) RETURNING *",
      [title, color, hoverColor]
    );

    const newGroup: TodoGroup = addNewGroup.rows[0];
    return newGroup;
  }
}

module.exports = new TodoGroupService();
