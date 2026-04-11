import { z } from "zod";

export const createTodoSchema = z.object({
  item: z
    .string()
    .min(1, "Judul todo wajib diisi")
    .max(100, "Judul maksimal 100 karakter"),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;