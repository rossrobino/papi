import type { SubmitFunction } from "$app/forms";
import { loading } from "$lib/stores";

export const loadingSubmitFunction: SubmitFunction = () => {
	loading.set(true);
	return async ({ update }) => {
		update();
		loading.set(false);
	};
};
