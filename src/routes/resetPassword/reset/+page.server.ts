import { UserSchema } from "$lib/zodSchemas";
import { error, fail } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(401, "Unauthorized");
		}

		const data = await request.formData();

		const password = String(data.get("password"));

		const safeParse = UserSchema.pick({ password: true }).safeParse({
			password,
		});

		if (!safeParse.success) {
			return fail(400, { error: JSON.stringify(safeParse.error.issues) });
		}

		const { error: dbError } = await db.auth.updateUser({
			password,
		});

		if (dbError) {
			return fail(500, { error: dbError.message });
		}

		return { success: "Password successfully reset." };
	},
};
