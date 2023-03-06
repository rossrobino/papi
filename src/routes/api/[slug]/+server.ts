import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

export const GET = (async ({ url, params }) => {
	const data = String(url.searchParams.get("data") ?? "G");

	// const name = params.slug;

	const prompt = `
		Example:
		Here is an E minor 7 guitar chord in JSON format:
		[{ "Em7": [ { "finger": 0, "string": 1, "fret": 0 }, { "finger": 0, "string": 2, "fret": 0 }, { "finger": 0, "string": 3, "fret": 0 }, { "finger": 0, "string": 4, "fret": 0 }, { "finger": 1, "string": 5, "fret": 2 }, { "finger": 0, "string": 6, "fret": 0 },]}]

		Context: String 1 is the highest string, string 5 is the A string. 

		Instructions:
		Send a ${data} chord in JSON format. Include only the JSON data, no other words or characters. Do not send any newlines.
	`;

	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: prompt }],
		temperature: 0,
		max_tokens: 500,
	});

	const message = trimMessage(String(response.data.choices[0].message?.content));

	const json = JSON.parse(message);
	return new Response(JSON.stringify(json, null, 4));
}) satisfies RequestHandler;

function trimMessage(json: string) {
	const arraySplit = json.split("\n");

	// filter out falsy
	const filtered = arraySplit.filter((n) => n);

	const trimmed = filtered.join("");
	return trimmed;
}
