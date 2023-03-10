import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
	const { db, session } = await parent();

	const { data: tableData } = await db
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
		.order("created_at", { ascending: false })
		.limit(10);

	const prompts = tableData as PromptWithProfile[];

	return {
		user: session?.user,
		prompts,
	};
};
