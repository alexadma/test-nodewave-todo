import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Judul todo wajib diisi")
    .max(100, "Judul maksimal 100 karakter"),
  description: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional(),
  dueDate: z.string().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;