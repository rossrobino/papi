import { error } from "@sveltejs/kit";

export const load = async ({ parent, params, route }) => {
	const { db, session } = await parent();

	const username = params.username;

	const { data: tableData, error: dbError } = await db
		.from("profiles")
		.select(
			`
			*,
			prompts (
				*,
				stars (
					user
				)
			)
		`,
		)
		.eq("username", username)
		.order("created_at", { foreignTable: "prompts", ascending: false });

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
		route,
	};
};
