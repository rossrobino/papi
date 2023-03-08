import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals: { db } }) => {
		let success = false;
		const formData = await request.formData();

		const username = String(formData.get("username"));
		const email = String(formData.get("email"));
		const password = String(formData.get("password"));

		const { error: dbError } = await db.auth.signUp({
			email,
			password,
			options: {
				data: { username },
			},
		});

		if (dbError) {
			success = false;
		} else {
			success = true;
		}

		const errorMessage = dbError?.message;

		// where to send after signup successful
		return { success, errorMessage };
		// throw redirect(303, "/login");
	},
};

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, "/app");
	}
};
