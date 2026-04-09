"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { clsx } from "clsx";
import { Trash2, Calendar, Loader2 } from "lucide-react";
import { useDeleteTodo, useToggleTodo } from "../hooks/useTodos";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Todo } from "@/types/todo.types";

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const { mutate: toggleTodo, isPending: isToggling } = useToggleTodo();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isCompleted = todo.status === "completed";

  const handleToggle = () => {
    if (isToggling) return;
    toggleTodo({ id: todo.id, status: todo.status });
  };

  const handleDelete = () => {
    if (confirmDelete) {
      deleteTodo(todo.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 2500);
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-4 bg-white rounded-2xl border p-4 shadow-sm transition-all group",
        isCompleted ? "border-slate-100 opacity-60" : "border-slate-200"
      )}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleToggle}
        disabled={isToggling}
        className="rounded-full w-5 h-5 border-slate-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            "text-sm font-medium text-slate-800 truncate",
            isCompleted && "line-through text-slate-400"
          )}
        >
          {todo.title}
        </p>
        {todo.dueDate && (
          <p className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
            <Calendar className="w-3 h-3" />
            {format(new Date(todo.dueDate), "d MMMM yyyy", { locale: id })}
          </p>
        )}
      </div>

      {/* Status Badge */}
      <Badge
        variant="secondary"
        className={clsx(
          "text-xs rounded-lg font-medium hidden sm:inline-flex",
          isCompleted
            ? "bg-green-50 text-green-700"
            : "bg-amber-50 text-amber-700"
        )}
      >
        {isCompleted ? "Selesai" : "Aktif"}
      </Badge>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={clsx(
          "p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100",
          confirmDelete
            ? "text-red-600 bg-red-50"
            : "text-slate-400 hover:text-red-500 hover:bg-red-50"
        )}
        title={confirmDelete ? "Klik lagi untuk konfirmasi" : "Hapus todo"}
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}