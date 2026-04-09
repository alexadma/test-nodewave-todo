"use client";

import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import type { TodoFilters } from "@/types/todo.types";

interface Props {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
}

export function TodoList({ filters, onFiltersChange }: Props) {
  const { data, isLoading, isError, refetch } = useTodos(filters);

  if (isLoading) return <TodoListSkeleton />;

  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 mb-3">Gagal memuat todo.</p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Coba lagi
        </Button>
      </div>
    );
  }

  const todos = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const currentPage = filters.page ?? 1;

  if (todos.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="font-medium">Tidak ada todo ditemukan</p>
        <p className="text-sm mt-1">Coba ubah filter atau tambah todo baru</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-slate-500">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled={currentPage <= 1}
              onClick={() =>
                onFiltersChange({ ...filters, page: currentPage - 1 })
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled={currentPage >= totalPages}
              onClick={() =>
                onFiltersChange({ ...filters, page: currentPage + 1 })
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function TodoListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-2xl" />
      ))}
    </div>
  );
}