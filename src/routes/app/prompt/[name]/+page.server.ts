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
};
