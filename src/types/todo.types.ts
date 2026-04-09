export type TodoStatus = "pending" | "completed";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  status?: TodoStatus;
  dueDate?: string;
}

export interface TodoFilters {
  status?: TodoStatus | "all";
  search?: string;
  page?: number;
  limit?: number;
}

export interface TodosResponse {
  data: Todo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}