import { axiosInstance } from "./axios";
import type {
  Todo,
  TodosResponse,
  CreateTodoPayload,
  UpdateTodoPayload,
  TodoFilters,
} from "@/types/todo.types";

export const todoService = {
  getAll: async (filters?: TodoFilters): Promise<TodosResponse> => {
    const params: Record<string, unknown> = {};
    if (filters?.isDone !== undefined && filters.isDone !== "all") params.isDone = filters.isDone;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = filters.page;
    if (filters?.limit) params.limit = filters.limit ?? 10;

    const { data } = await axiosInstance.get<TodosResponse>("/todos", { params });
    return data;
  },

  create: async (payload: CreateTodoPayload): Promise<Todo> => {
    const { data } = await axiosInstance.post<{ content: Todo }>("/todos", payload);
    return data.content;
  },

  update: async (id: string, payload: UpdateTodoPayload): Promise<Todo> => {
    const { data } = await axiosInstance.patch<{ content: Todo }>(`/todos/${id}`, payload);
    return data.content;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/todos/${id}`);
  },

  toggleDone: async (id: string, isDone: boolean): Promise<Todo> => {
    try {
      const { data } = await axiosInstance.patch<{ content: Todo }>(`/todos/${id}`, {
        isDone,
      });
      return data.content;
    } catch (error: any) {
      console.log("404 response body:", error?.response?.data);
      console.log("404 message:", error?.response?.data?.message);
      throw error;
    }
  },
};