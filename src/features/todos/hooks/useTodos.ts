import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { todoService } from "@/services/todo.service";
import type { CreateTodoPayload, TodoFilters } from "@/types/todo.types";

export const TODO_KEYS = {
  all: ["todos"] as const,
  lists: () => [...TODO_KEYS.all, "list"] as const,
  list: (filters: TodoFilters) => [...TODO_KEYS.lists(), filters] as const,
};

export function useTodos(filters: TodoFilters = {}) {
  return useQuery({
    queryKey: TODO_KEYS.list(filters),
    queryFn: () => todoService.getAll(filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTodoPayload) => todoService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TODO_KEYS.lists() });
      toast.success("Todo berhasil dibuat! ✅");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Gagal membuat todo.";
      toast.error(message);
    },
  });
}

export function useDeleteTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: TODO_KEYS.lists() });
      toast.success("Todo berhasil dihapus!");
    },
    onError: () => {
      toast.error("Gagal menghapus todo.");
    },
  });
}

export function useToggleTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isDone }: { id: string; isDone: boolean }) =>
      todoService.toggleDone(id, isDone),

    onMutate: async ({ id, isDone }) => {
      await qc.cancelQueries({ queryKey: TODO_KEYS.lists() });
      const previousData = qc.getQueriesData({ queryKey: TODO_KEYS.lists() });

      qc.setQueriesData({ queryKey: TODO_KEYS.lists() }, (old: any) => {
        if (!old?.content?.entries) return old;
        return {
          ...old,
          content: {
            ...old.content,
            entries: old.content.entries.map((todo: any) =>
              todo.id === id ? { ...todo, isDone } : todo
            ),
          },
        };
      });

      return { previousData };
    },

    onError: (_error, _, context) => {
      context?.previousData?.forEach(([queryKey, data]) => {
        qc.setQueryData(queryKey, data);
      });
      toast.error("Gagal mengubah status todo.");
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: TODO_KEYS.lists() });
    },
  });
}