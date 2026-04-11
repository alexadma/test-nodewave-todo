"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { clsx } from "clsx";
import { Trash2, Loader2 } from "lucide-react";
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

  const handleToggle = () => {
    if (isToggling) return;
    toggleTodo({ id: todo.id, isDone: !todo.isDone }); // kirim nilai BARU
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
        todo.isDone ? "border-slate-100 opacity-60" : "border-slate-200"
      )}
    >
      <Checkbox
        checked={todo.isDone}
        onCheckedChange={handleToggle}
        disabled={isToggling}
        className="rounded-full w-5 h-5 border-slate-300 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
      />

      <div className="flex-1 min-w-0">
        <p
          className={clsx(
            "text-sm font-medium text-slate-800 truncate",
            todo.isDone && "line-through text-slate-400"
          )}
        >
          {todo.item}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          Dibuat {format(new Date(todo.createdAt), "d MMMM yyyy", { locale: id })}
        </p>
      </div>

      <Badge
        variant="secondary"
        className={clsx(
          "text-xs rounded-lg font-medium hidden sm:inline-flex",
          todo.isDone ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
        )}
      >
        {todo.isDone ? "Selesai" : "Aktif"}
      </Badge>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={clsx(
          "p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100",
          confirmDelete ? "text-red-600 bg-red-50" : "text-slate-400 hover:text-red-500 hover:bg-red-50"
        )}
        title={confirmDelete ? "Klik lagi untuk konfirmasi" : "Hapus todo"}
      >
        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </div>
  );
}