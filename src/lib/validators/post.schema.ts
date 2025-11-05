import * as z from "zod";

export const postFormSchema = z.object({
  public: z.boolean(),
  title: z
    .string()
    .refine(
      (value) => !value.startsWith(" "),
      "Title cannot start with a space"
    )
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .refine(
      (value) => !value.startsWith(" "),
      "Description cannot start with a space"
    )
    .min(5, "Description must be at least 5 characters long")
    .max(500, "Description must be at most 500 characters long"),
  content: z
    .string()
    .refine(
      (value) => !value.startsWith(" "),
      "Content cannot start with a space"
    )
    .min(5, "Content must be at least 5 characters long")
    .max(2000, "Content must be at most 2000 characters long"),
});

export type PostFormData = z.infer<typeof postFormSchema>;
