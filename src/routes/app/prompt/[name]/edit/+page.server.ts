import { error, redirect } from "@sveltejs/kit";
import { PromptSchema } from "$lib/zodSchemas";

export const actions = {
	edit: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(401, "Unauthorized");
		}

		const data = await request.formData();

		const id = String(data.get("id"));

		const prompt = {
			name: String(data.get("name")).trim().toLowerCase(),
			description: String(data.get("description")).trim(),
			source: String(data.get("source")).trim(),
			prompt: String(data.get("prompt") ?? "").trim(),
			repository: String(data.get("repository") ?? "").trim(),
			path: String(data.get("path") ?? "").trim(),
		};

		const safeParse = PromptSchema.safeParse(prompt);
		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db
			.from("prompts")
			.update(prompt)
			.eq("id", id);

		if (dbError) {
			return { error: dbError.message };
		}

		throw redirect(303, `/app/prompt/${prompt.name}`);
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

export const load = async ({ params, locals: { db, getSession } }) => {
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
