import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

export const actions: Actions = {
	signIn: async ({ locals: { db } }) => {
		const { error: dbError } = await db.auth.signInWithOAuth({
			provider: "google",
		});

		if (dbError) {
			if (dbError instanceof AuthApiError && dbError.status === 400) {
				throw error(400, "Invalid credentials");
			}
			throw error(500, "Server error. Try again later.");
		}

		// where to send after login successful
		throw redirect(303, "/test");
	},

	signOut: async ({ locals: { db } }) => {
		await db.auth.signOut();
		throw redirect(303, "/");
	},
};
