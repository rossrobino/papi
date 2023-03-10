import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { UserSchema } from "$lib/zodSchemas";

export const actions: Actions = {
	default: async ({ request, locals: { db } }) => {
		let success = false;
		const formData = await request.formData();

		const username = String(formData.get("username")).trim().toLowerCase();
		const email = String(formData.get("email")).trim().toLowerCase();
		const password = String(formData.get("password"));

		// zod validation
		const safeParse = UserSchema.pick({
			username: true,
			email: true,
			password: true,
		}).safeParse({
			username,
			email,
			password,
		});
		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db.auth.signUp({
			email,
			password,
			options: {
				data: { username },
			},
		});

		if (dbError) {
			return { error: dbError.message };
		} else {
			success = true;
		}

		// displays message to check email
		return { success };
	},
};

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, "/app");
	}
};
