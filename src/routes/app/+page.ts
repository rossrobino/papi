export const load = async ({ parent }) => {
	const { db, session } = await parent();

	const { data: newPromptData, error: newPromptError } = await db
		.from("prompts")
		.select(
			`
			*,
			profiles (
				id,
				username
			),
			stars (
				user
			)
		`,
		)
		.order("created_at", { ascending: false })
		.limit(10);

	const newPrompts = newPromptError
		? []
		: (newPromptData as PromptWithProfileAndStars[]);

	const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

	const { data: trendingData, error: trendingError } = await db
		.from("prompts")
		.select(
			`
			*,
			profiles (
				id,
				username
			),
			stars(
				user(count)
			)
		`,
		)
		.gt("created_at", startDate.toISOString())
		.order("stars_count");

	const trendingPrompts = trendingError
		? []
		: (trendingData as PromptWithProfileAndStarsCount[]);

	trendingPrompts?.reverse();
	trendingPrompts?.splice(6);

	console.log(trendingData);

	return {
		user: session?.user,
		newPrompts,
		trendingPrompts,
	};
};
