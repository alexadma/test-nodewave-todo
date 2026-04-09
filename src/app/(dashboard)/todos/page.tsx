"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TodoList } from "@/features/todos/components/TodoList";
import { TodoForm } from "@/features/todos/components/TodoForm";
import { TodoFiltersBar } from "@/features/todos/components/TodoFilters";
import { CalendarView } from "@/features/todos/components/CalendarView";
import type { TodoFilters } from "@/types/todo.types";

export default function TodosPage() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const isCalendarView = view === "calendar";

  const [filters, setFilters] = useState<TodoFilters>({
    status: "all",
    search: "",
    page: 1,
    limit: 10,
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          {isCalendarView ? "📅 Kalender Todo" : "📋 Todo Saya"}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {isCalendarView
            ? "Lihat todo berdasarkan tanggal"
            : "Kelola semua tugas harianmu"}
        </p>
      </div>

      {isCalendarView ? (
        <CalendarView />
      ) : (
        <>
          <TodoForm />
          <div className="mt-6">
            <TodoFiltersBar filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="mt-4">
            <TodoList filters={filters} onFiltersChange={setFilters} />
          </div>
        </>
      )}
    </div>
  );
}