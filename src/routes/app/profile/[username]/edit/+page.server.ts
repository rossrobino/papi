import { error, redirect } from "@sveltejs/kit";
import { UserSchema } from "$lib/zodSchemas";

export const actions = {
	default: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(401, "Unauthorized");
		}

		const data = await request.formData();

		const user = {
			username: String(data.get("username")).trim().toLowerCase(),
			github: String(data.get("github")).trim().toLowerCase(),
		};

		const safeParse = UserSchema.pick({
			username: true,
			github: true,
		}).safeParse(user);

		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db
			.from("profiles")
			.update(user)
			.eq("id", session.user.id);

		if (dbError) {
			return { error: dbError.message };
		}

		throw redirect(303, `/app/profile/${user.username}`);
	},
};

export const load = async ({ params, locals: { db, getSession } }) => {
	const session = await getSession();

	const username = params.username;

	const { data, error: dbError } = await db
		.from("profiles")
		.select("id")
		.eq("username", username);

	if (dbError) {
		throw error(500, dbError.message);
	}

	if (session?.user.id !== data[0].id) {
		throw redirect(303, "/app/profile/" + username);
	}
};
