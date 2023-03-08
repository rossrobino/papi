import type { Actions } from "./$types";

export const actions = {
	signOut: async ({ locals: { db } }) => {
		await db.auth.signOut();
	},
} satisfies Actions;
