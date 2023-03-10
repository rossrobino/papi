import { info } from "$lib/info";
import { UserSchema } from "$lib/zodSchemas";
import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals: { db } }) => {
		const data = await request.formData();

		const email = String(data.get("email")).trim().toLowerCase();

		const safeParse = UserSchema.pick({ email: true }).safeParse({ email });

		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db.auth.resetPasswordForEmail(email, {
			redirectTo: info.baseUrl + "/resetPassword/reset",
		});

		if (dbError) {
			return { error: dbError.message };
		}

		return {
			success: `Reset password link sent to ${email}. Check your spam folder if you do not receive the message in your inbox.`,
		};
	},
};
