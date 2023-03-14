import { githubContents } from "$lib/util/githubContents";
import { error } from "@sveltejs/kit";

export const load = async ({ parent, params, fetch }) => {
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

	if (prompt.source === "github") {
		prompt.prompt = await githubContents(
			String(prompt.repository),
			String(prompt.path),
			fetch,
		);
	}

	if (!prompt) {
		throw error(404, "Prompt not found");
	}

	return {
		user: session?.user,
		prompt,
	};
};
