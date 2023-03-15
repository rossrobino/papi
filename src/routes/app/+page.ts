export const load = async ({ parent }) => {
	const { db, session } = await parent();

	// NEW

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

	// TRENDING

	// seven days ago
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

	// last 6 items of response
	trendingPrompts?.slice(Math.max(trendingPrompts.length - 6, 0));
	trendingPrompts?.reverse();

	return {
		user: session?.user,
		newPrompts,
		trendingPrompts,
	};
};
