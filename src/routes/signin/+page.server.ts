import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

export const actions: Actions = {
	default: async ({ request, locals: { db } }) => {
		const formData = await request.formData();

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const { error: dbError } = await db.auth.signInWithPassword({
			email,
			password,
		});

		if (dbError) {
			if (dbError instanceof AuthApiError && dbError.status === 400) {
				throw error(400, "Invalid credentials " + email);
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
