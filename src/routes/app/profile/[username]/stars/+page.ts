import { error } from "@sveltejs/kit";

export const load = async ({ parent, params }) => {
	const { db, session } = await parent();

	const username = params.username;

	const { data: idData, error: idError } = await db
		.from("profiles")
		.select("id")
		.eq("username", username);

	if (idError) {
		throw error(404, idError.message);
	}

	const id = idData[0].id;

	const { data: tableData, error: dbError } = await db
		.from("stars")
		.select(
			`
			prompts (
				*,
				stars (
					user
				)
			)
		`,
		)
		.eq("user", id)
		.order("created_at", { foreignTable: "prompts", ascending: false });

	if (dbError) {
		throw error(500, dbError.message);
	}

	const stars = tableData as StarsWithPrompt[];

	console.log(stars);

	if (!stars) {
		throw error(404, "User not found.");
	}

	return {
		user: session?.user,
		stars,
	};
};
