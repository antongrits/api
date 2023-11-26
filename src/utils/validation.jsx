import { z } from "zod";

export const User = z
  .object({
    email: z.string().email({ message: "Please enter the correct email" }),
    password: z
      .string()
      .refine((password) => password.length >= 8, {
        message: "Password must be at least 8 characters long",
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((password) => /\d/.test(password), {
        message: "Password must contain at least one digit",
      }),
    date: z.number(),
    id: z.string().uuid(),
  })
  .partial();

export const Note = z
  .object({
    userId: z.string().uuid(),
    id: z.string().uuid(),
    name: z.string().trim().min(1, { message: "The name cannot be empty" }),
    date: z.number(),
    text: z.string().min(0),
  })
  .partial();
