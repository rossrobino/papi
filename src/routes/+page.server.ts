export const actions = {
	signOut: async ({ locals: { db } }) => {
		await db.auth.signOut();
	},
};
