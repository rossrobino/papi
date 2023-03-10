import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { PromptSchema } from "$lib/zodSchemas";

export const actions: Actions = {
	edit: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(401, "Unauthorized");
		}

		const data = await request.formData();

		const id = String(data.get("id"));
		const name = String(data.get("name"));
		const prompt = String(data.get("prompt"));
		const description = String(data.get("description"));

		const safeParse = PromptSchema.safeParse({ name, description, prompt });
		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db
			.from("prompts")
			.update({ description, prompt, name })
			.eq("id", id);

		if (dbError) {
			return { error: dbError.message };
		}

		throw redirect(303, `/app/prompt/${name}`);
	},
	delete: async ({ params, locals: { db, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(401, "Unauthorized");
		}

		const name = params.name;

		const { error: dbError } = await db
			.from("prompts")
			.delete()
			.eq("name", name);

		if (dbError) {
			throw error(500, dbError.message);
		}
		throw redirect(303, `/app`);
	},
};

export const load: PageServerLoad = async ({
	params,
	locals: { db, getSession },
}) => {
	const session = await getSession();

	const name = params.name;

	const { data, error: dbError } = await db
		.from("prompts")
		.select("user")
		.eq("name", name);

	if (dbError) {
		throw error(500, dbError.message);
	}

	if (session?.user.id !== data[0].user) {
		throw redirect(303, "/app/prompt/" + name);
	}
};
