import * as z from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  otp: z.string().length(6, "OTP must be exactly 6 characters").optional(),
});

export type SignInData = z.infer<typeof signInSchema>;
