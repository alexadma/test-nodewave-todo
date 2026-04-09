"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoSchema, type CreateTodoInput } from "../schemas/todo.schema";
import { useCreateTodo } from "../hooks/useTodos";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

export function TodoForm() {
  const { mutate: createTodo, isPending } = useCreateTodo();

  const form = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = (values: CreateTodoInput) => {
    createTodo(values, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 bg-white rounded-2xl border border-slate-200 p-3 shadow-sm"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Tambah todo baru..."
                  className="border-0 shadow-none focus-visible:ring-0 text-slate-700 placeholder:text-slate-400"
                  {...field}
                />
              </FormControl>
              <FormMessage className="px-2" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          size="sm"
          className="rounded-xl bg-violet-600 hover:bg-violet-700 px-4"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      </form>
    </Form>
  );
}