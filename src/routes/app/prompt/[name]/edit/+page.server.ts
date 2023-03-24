import { error, fail, redirect } from "@sveltejs/kit";
import { PromptSchema } from "$lib/zodSchemas";
import { moderate } from "$lib/util/moderate.server";

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
			return fail(400, { error: JSON.stringify(safeParse.error.issues) });
		}

		const flagged = await moderate(Object.values(prompt));

		if (flagged) {
			return fail(400, { error: "Violates content policy." });
		}

		const { error: dbError } = await db
			.from("prompts")
			.update(prompt)
			.eq("id", id);

		if (dbError) {
			return fail(500, { error: dbError.message });
		}

		throw redirect(303, `/app/prompt/${prompt.name}`);
	},
	delete: async ({ params, request, locals: { db, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw error(401, "Unauthorized");
		}

		const data = await request.formData();
		const id = String(data.get("id"));

		// delete stars associated with the prompt
		const { error: deleteStarsError } = await db
			.from("stars")
			.delete()
			.eq("prompt", id);

		if (deleteStarsError) {
			throw error(500, deleteStarsError.message);
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
