import { error, fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import { UserSchema } from "$lib/zodSchemas";

export const actions = {
	default: async ({ request, locals: { db } }) => {
		const formData = await request.formData();

		const user = {
			email: String(formData.get("email")).trim().toLowerCase(),
			password: String(formData.get("password")),
		};

		// zod validation
		const safeParse = UserSchema.pick({
			email: true,
			password: true,
		}).safeParse(user);

		if (!safeParse.success) {
			return fail(400, {
				error: JSON.stringify(safeParse.error.issues),
			});
		}

		const { error: dbError } = await db.auth.signInWithPassword(user);

		if (dbError) {
			if (dbError instanceof AuthApiError && dbError.status === 400) {
				return fail(400, { error: dbError.message });
			}
			throw error(500, dbError.message);
		}

		// where to send after login successful
		throw redirect(303, "/app");
	},
};

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, "/app");
	}
};
