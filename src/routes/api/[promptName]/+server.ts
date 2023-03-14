import { error, json } from "@sveltejs/kit";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";
import { insertDataIntoPrompt } from "$lib/util/insertDataIntoPrompt";
import { githubContents } from "$lib/util/githubContents";

export const GET = async ({ url, params, locals: { db }, fetch }) => {
	const data = String(url.searchParams.get("data") ?? "{}");

	const name = params.promptName;

	const { data: dbData, error: dbError } = await db
		.from("prompts")
		.select("prompt, source, repository, path")
		.eq("name", name);

	if (dbError) throw error(404, dbError.message);

	let prompt = String(dbData[0].prompt);

	if (dbData[0].source === "github") {
		prompt = await githubContents(
			String(dbData[0].repository),
			String(dbData[0].path),
			fetch,
		);
	}

	const promptWithData = insertDataIntoPrompt(data, prompt);

	console.log(promptWithData);

	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: promptWithData }],
		temperature: 0,
		max_tokens: 500,
	});

	const message = String(response.data.choices[0].message?.content).trim();

	return json(message);
};
