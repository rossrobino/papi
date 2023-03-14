import { error, redirect } from "@sveltejs/kit";
import { adminAuthClient } from "$lib/db/adminAuthClient.server";

export const load = async ({ params, locals: { db, getSession } }) => {
	const session = await getSession();

	const username = params.username;

	const { data, error: dbError } = await db
		.from("profiles")
		.select("id")
		.eq("username", username);

	if (dbError) {
		throw error(500, dbError.message);
	}

	if (session?.user.id !== data[0].id) {
		throw redirect(303, "/app/profile/" + username);
	}
};

export const actions = {
	default: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(401, "Unauthorized");
		}

		const data = await request.formData();
		const confirm = data.get("confirm");

		if (confirm === "delete-my-account") {
			const { error: promptsError } = await db
				.from("prompts")
				.delete()
				.eq("user", session.user.id);

			if (promptsError) {
				return { error: promptsError.message };
			}

			const { error: profilesError } = await db
				.from("profiles")
				.delete()
				.eq("id", session.user.id);

			if (profilesError) {
				return { error: profilesError.message };
			}

			const { error: signoutError } = await db.auth.signOut();

			if (signoutError) {
				return { error: signoutError.message };
			}

			const { error: userError } = await adminAuthClient.deleteUser(
				session.user.id,
			);

			if (userError) {
				return { error: userError.message };
			}
		} else {
			return {
				error: 'Please confirm by typing "delete-my-account" into the form.',
			};
		}

		throw redirect(303, "/");
	},
};
