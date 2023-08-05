export interface TodoDTO {
  id: number;
  title: string;
  completed: boolean;
  todo_groups: number[];
}

export interface TodoGroup {
  id: number;
  title: string;
}
