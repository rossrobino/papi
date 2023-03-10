import { z } from "zod";

export const UserSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.regex(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"), {
			message:
				"Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number",
		}),
	username: z
		.string()
		.min(2, { message: "Username must be at least 2 characters" })
		.max(30, { message: "Username must be less than 30 characters" })
		.regex(new RegExp("^[a-z0-9]+$"), {
			message: "Username must be letters and numbers only",
		}),
	github: z.string().optional(),
});

export const PromptSchema = z.object({
	name: z.string().min(2).max(30).regex(new RegExp("^[a-z0-9-]+$"), {
		message: "Name must be letters, numbers, and dashes only",
	}),
	description: z.string(),
	prompt: z.string(),
});
