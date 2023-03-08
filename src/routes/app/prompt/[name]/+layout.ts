import type { LayoutLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: LayoutLoad = async ({ parent, params }) => {
	const { db, session } = await parent();

	const name = params.name;

	const { data: tableData, error: dbError } = await db
		.from("prompts")
		.select(
			`
			*,
			profiles (
				id,
				username
			)
		`,
		)
		.eq("name", name);

	if (dbError) {
		throw error(500, dbError.message);
	}

	const prompt = tableData[0] as PromptWithProfile;

	if (!prompt) {
		throw error(404, "Prompt not found.");
	}

	return {
		user: session?.user,
		prompt,
	};
};
