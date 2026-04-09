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
    if (filters?.status && filters.status !== "all") params.status = filters.status;
    if (filters?.search) params.search = filters.search;
    if (filters?.page) params.page = filters.page;
    if (filters?.limit) params.limit = filters.limit ?? 10;

    const { data } = await axiosInstance.get<TodosResponse>("/todos", { params });
    return data;
  },

  getById: async (id: string): Promise<Todo> => {
    const { data } = await axiosInstance.get<Todo>(`/todos/${id}`);
    return data;
  },

  create: async (payload: CreateTodoPayload): Promise<Todo> => {
    const { data } = await axiosInstance.post<Todo>("/todos", payload);
    return data;
  },

  update: async (id: string, payload: UpdateTodoPayload): Promise<Todo> => {
    const { data } = await axiosInstance.patch<Todo>(`/todos/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/todos/${id}`);
  },

  toggleStatus: async (id: string, currentStatus: string): Promise<Todo> => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    const { data } = await axiosInstance.patch<Todo>(`/todos/${id}`, {
      status: newStatus,
    });
    return data;
  },
};