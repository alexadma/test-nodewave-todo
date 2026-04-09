"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import { useTodos } from "../hooks/useTodos";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/badge";

export function CalendarView() {
  const [selected, setSelected] = useState<Date>(new Date());

  // Fetch all todos (no filter) to map to calendar
  const { data, isLoading } = useTodos({ limit: 100 });
  const todos = data?.data ?? [];

  // Group todos by date
  const todosOnDate = todos.filter(
    (t) => t.dueDate && isSameDay(new Date(t.dueDate), selected)
  );

  // Days that have todos (for highlighting)
  const todosDates = todos
    .filter((t) => t.dueDate)
    .map((t) => new Date(t.dueDate!));

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Calendar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 w-full lg:w-auto">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => d && setSelected(d)}
          locale={id}
          modifiers={{ hasTodo: todosDates }}
          modifiersClassNames={{
            hasTodo: "!bg-violet-100 !text-violet-700 font-semibold rounded-full",
          }}
          classNames={{
            day_selected: "!bg-violet-600 !text-white rounded-full",
            day_today: "!font-bold",
          }}
        />
      </div>

      {/* Todo list for selected date */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-700 mb-4">
          {format(selected, "EEEE, d MMMM yyyy", { locale: id })}
        </h3>

        {isLoading ? (
          <p className="text-slate-400 text-sm">Memuat...</p>
        ) : todosOnDate.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <p className="text-4xl mb-2">📭</p>
            <p className="text-sm">Tidak ada todo pada tanggal ini</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todosOnDate.map((todo) => (
              <div
                key={todo.id}
                className={clsx(
                  "flex items-center gap-3 p-3 rounded-xl border",
                  todo.status === "completed"
                    ? "border-green-100 bg-green-50"
                    : "border-slate-100 bg-slate-50"
                )}
              >
                <div
                  className={clsx(
                    "w-2 h-2 rounded-full flex-shrink-0",
                    todo.status === "completed"
                      ? "bg-green-500"
                      : "bg-amber-400"
                  )}
                />
                <p
                  className={clsx(
                    "text-sm flex-1",
                    todo.status === "completed" && "line-through text-slate-400"
                  )}
                >
                  {todo.title}
                </p>
                <Badge
                  variant="secondary"
                  className={clsx(
                    "text-xs",
                    todo.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {todo.status === "completed" ? "Selesai" : "Aktif"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}