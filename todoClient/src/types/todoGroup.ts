export interface TodoGroup {
  id: number;
  title: string;
  color: string;
  hoverColor: string;
}

export interface PaginatedTodoGroups {
  groups: TodoGroup[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
