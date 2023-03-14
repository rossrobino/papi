import { redirect } from "@sveltejs/kit";
import { UserSchema } from "$lib/zodSchemas";

export const actions = {
	default: async ({ request, locals: { db } }) => {
		let success = false;
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
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db.auth.signUp({
			email: user.email,
			password: user.password,
			options: {
				data: { username: user.username },
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

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		throw redirect(303, "/app");
	}
};
