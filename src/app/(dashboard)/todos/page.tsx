import { Suspense } from "react";
import { TodosContent } from "./TodosContent";

export default function TodosPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-400">Memuat...</div>}>
      <TodosContent />
    </Suspense>
  );
}