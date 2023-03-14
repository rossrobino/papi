import { error, redirect } from "@sveltejs/kit";

export const actions = {
	run: async ({ fetch, params, request }) => {
		const name = params.name;

		const data = await request.formData();
		const dataString = String(data.get("dataString"));

		const endpoint = `/api/${name}${dataString}`;
		const response = await fetch(endpoint);

		const answer = await response.json();

		return { answer };
	},
	star: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, "/signin");
		}

		const data = await request.formData();

		const star = {
			user: session.user.id,
			prompt: String(data.get("id")),
		};

		const { error: dbError } = await db.from("stars").insert(star);

		if (dbError) {
			throw error(500, dbError.message);
		}
	},
	removeStar: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw redirect(303, "/signin");
		}

		const data = await request.formData();

		const star = {
			user: session.user.id,
			prompt: String(data.get("id")),
		};

		const { error: dbError } = await db
			.from("stars")
			.delete()
			.eq("user", star.user)
			.eq("prompt", star.prompt);

		if (dbError) {
			throw error(500, dbError.message);
		}
	},
};
