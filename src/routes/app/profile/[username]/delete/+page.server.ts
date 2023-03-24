import { error, fail, redirect } from "@sveltejs/kit";
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
			// delete stars associated with the user's prompts
			const { data: userPrompts, error: getPromptsError } = await db
				.from("prompts")
				.select()
				.eq("user", session.user.id);

			if (getPromptsError) {
				return fail(500, { error: getPromptsError.message });
			}

			let orString = "";

			userPrompts.forEach((prompt, i) => {
				orString += `prompt.eq.${prompt.id}`;
				if (i !== userPrompts.length - 1) {
					orString += ",";
				}
			});

			if (orString) {
				const { error: deleteStarsError } = await db
					.from("stars")
					.delete()
					.or(orString);

				if (deleteStarsError) {
					return fail(500, { error: deleteStarsError.message });
				}
			}

			// delete the user's starred prompts
			const { error: deleteUserStarsError } = await db
				.from("stars")
				.delete()
				.eq("user", session.user.id);

			if (deleteUserStarsError) {
				return fail(500, { error: deleteUserStarsError.message });
			}

			// delete prompts
			const { error: promptsError } = await db
				.from("prompts")
				.delete()
				.eq("user", session.user.id);

			if (promptsError) {
				return fail(500, { error: promptsError.message });
			}

			const { error: profilesError } = await db
				.from("profiles")
				.delete()
				.eq("id", session.user.id);

			if (profilesError) {
				return fail(500, { error: profilesError.message });
			}

			const { error: signoutError } = await db.auth.signOut();

			if (signoutError) {
				return fail(500, { error: signoutError.message });
			}

			const { error: userError } = await adminAuthClient.deleteUser(
				session.user.id,
			);

			if (userError) {
				return fail(500, { error: userError.message });
			}
		} else {
			return fail(400, {
				error: 'Please confirm by typing "delete-my-account" into the form.',
			});
		}

		throw redirect(303, "/");
	},
};
