import { error, redirect } from "@sveltejs/kit";
import { PromptSchema } from "$lib/zodSchemas";
import { moderate } from "$lib/util/moderate.server";

export const actions = {
	default: async ({ request, locals: { db, getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, "Unauthorized");
		}

		const data = await request.formData();

		const prompt = {
			user: session?.user.id,
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

		const flagged = await moderate(Object.values(prompt));

		if (flagged) {
			return { error: "Violates content policy." };
		}

		const { error: dbError } = await db.from("prompts").insert(prompt);

		if (dbError) {
			return { error: dbError.message };
		}

		throw redirect(303, "/app/prompt/" + prompt.name);
	},
};

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, "/signin");
	}
};
