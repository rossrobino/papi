import { error } from "@sveltejs/kit";

export const load = async ({ parent, params }) => {
	const { db, session } = await parent();

	const username = params.username;

	const { data: tableData, error: dbError } = await db
		.from("profiles")
		.select(
			`
			*,
			prompts (
				*
			)
		`,
		)
		.eq("username", username);

	if (dbError) {
		throw error(500, dbError.message);
	}

	const profile = tableData[0] as ProfileWithPrompts;

	if (!profile) {
		throw error(404, "User not found.");
	}

	return {
		user: session?.user,
		profile,
	};
};
