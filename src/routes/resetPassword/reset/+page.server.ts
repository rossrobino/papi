import { UserSchema } from "$lib/zodSchemas";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals: { db } }) => {
		const data = await request.formData();

		const password = String(data.get("password"));

		const safeParse = UserSchema.pick({ password: true }).safeParse({
			password,
		});

		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db.auth.updateUser({
			password,
		});

		if (dbError) {
			return { error: dbError.message };
		}

		return { success: "Password successfully reset." };
	},
};
