import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { PromptSchema } from "$lib/zodSchemas";

export const actions: Actions = {
	default: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const user = session?.user.id;

		const data = await request.formData();
		const name = String(data.get("name")).trim().toLowerCase();
		const description = String(data.get("description")).trim();
		const prompt = String(data.get("prompt")).trim();

		const safeParse = PromptSchema.safeParse({ name, description, prompt });
		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db
			.from("prompts")
			.insert({ name, description, prompt, user });

		if (dbError) {
			return { error: dbError.message };
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
