import { TodoGroup } from "models/todoDTO";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export interface PaginatedTodoGroups {
  groups: TodoGroup[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
