"use client";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { clsx } from "clsx";
import type { TodoFilters } from "@/types/todo.types";

interface Props {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
}

const STATUS_OPTIONS = [
  { label: "Semua", value: "all" },
  { label: "Aktif", value: "false" },
  { label: "Selesai", value: "true" },
] as const;

export function TodoFiltersBar({ filters, onFiltersChange }: Props) {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFiltersChange({ ...filters, search: e.target.value, page: 1 });
    },
    [filters, onFiltersChange]
  );

  const handleStatus = useCallback(
    (value: string) => {
      const isDone = value === "all" ? "all" : value === "true";
      onFiltersChange({ ...filters, isDone, page: 1 });
    },
    [filters, onFiltersChange]
  );

  const clearSearch = () => {
    onFiltersChange({ ...filters, search: "", page: 1 });
  };

  const currentValue =
    filters.isDone === "all" ? "all" : filters.isDone ? "true" : "false";

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={filters.search || ""}
          onChange={handleSearch}
          placeholder="Cari todo..."
          className="pl-9 pr-9 rounded-xl border-slate-200 h-10"
        />
        {filters.search && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Status Filter */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleStatus(opt.value)}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              currentValue === opt.value
                ? "bg-white text-violet-700 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}