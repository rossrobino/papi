import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const user = session?.user.id;

		const data = await request.formData();
		const name = String(data.get("name"));
		const description = String(data.get("description"));
		const prompt = String(data.get("prompt"));

		const { error: dbError } = await db
			.from("prompts")
			.insert({ name, description, prompt, user });

		if (dbError) {
			throw error(500, dbError.message);
		}

		throw redirect(303, "/app/prompt/" + name);
	},
};

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, "/signin");
	}
};
