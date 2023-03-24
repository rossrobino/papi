import { info } from "$lib/info";
import { UserSchema } from "$lib/zodSchemas";
import { fail } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, locals: { db } }) => {
		const data = await request.formData();

		const email = String(data.get("email")).trim().toLowerCase();

		const safeParse = UserSchema.pick({ email: true }).safeParse({ email });

		if (!safeParse.success) {
			return fail(400, { error: JSON.stringify(safeParse.error.issues) });
		}

		const { error: dbError } = await db.auth.resetPasswordForEmail(email, {
			redirectTo: info.baseUrl + "/resetPassword/reset",
		});

		if (dbError) {
			return fail(500, { error: dbError.message });
		}

		return {
			success: `Reset password link sent to ${email}. Check your spam folder if you do not receive the message in your inbox.`,
		};
	},
};
