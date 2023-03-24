import { fail, redirect } from "@sveltejs/kit";
import { UserSchema } from "$lib/zodSchemas";

export const actions = {
	default: async ({ request, locals: { db } }) => {
		const formData = await request.formData();

		const user = {
			username: String(formData.get("username")).trim().toLowerCase(),
			email: String(formData.get("email")).trim().toLowerCase(),
			password: String(formData.get("password")),
		};

		// zod validation
		const safeParse = UserSchema.pick({
			username: true,
			email: true,
			password: true,
		}).safeParse(user);

		if (!safeParse.success) {
			return fail(400, { error: JSON.stringify(safeParse.error.issues) });
		}

		const { error: dbError } = await db.auth.signUp({
			email: user.email,
			password: user.password,
			options: {
				data: { username: user.username },
			},
		});

		if (dbError) {
			return fail(500, { error: dbError.message });
		}

		// displays message to check email
		return { success: true };
	},
};

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, "/app");
	}
};
