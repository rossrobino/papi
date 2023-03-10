import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import { UserSchema } from "$lib/zodSchemas";

export const actions: Actions = {
	default: async ({ request, locals: { db } }) => {
		const formData = await request.formData();

		const email = String(formData.get("email")).trim().toLowerCase();
		const password = String(formData.get("password"));

		// zod validation
		const safeParse = UserSchema.pick({
			email: true,
			password: true,
		}).safeParse({ email, password });

		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db.auth.signInWithPassword({
			email,
			password,
		});

		if (dbError) {
			if (dbError instanceof AuthApiError && dbError.status === 400) {
				return { error: dbError.message };
			}
			throw error(500, "Server error. Try again later.");
		}

		// where to send after login successful
		throw redirect(303, "/app");
	},
};

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, "/app");
	}
};
