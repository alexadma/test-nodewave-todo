export interface Todo {
  id: string;
  item: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTodoPayload {
  item: string;
}

export interface UpdateTodoPayload {
  item?: string;
  isDone?: boolean;
}

export interface TodoFilters {
  isDone?: boolean | "all";
  search?: string;
  page?: number;
  limit?: number;
}

export interface TodosResponse {
  content: {
    entries: Todo[];
    totalData: number;
    totalPage: number;
  };
  message: string;
  errors: [];
}