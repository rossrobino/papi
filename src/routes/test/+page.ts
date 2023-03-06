// src/routes/profile/+page.ts
import type { PageLoad } from "./$types";
// import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ parent }) => {
	const { db, session } = await parent();

	// if (!session) {
	// 	throw redirect(303, "/");
	// }
	
	const { data: tableData } = await db.from("test").select("*");

	return {
		user: session?.user,
		tableData,
	};
};
