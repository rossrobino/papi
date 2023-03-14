import { dev } from "$app/environment";

export const info = {
	baseUrl: dev ? "http://localhost:5173" : "https://papi.run",
};
