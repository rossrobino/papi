// src/routes/+layout.ts
import { invalidate } from "$app/navigation";
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { Database } from "$lib/db/types";
import { error } from "@sveltejs/kit";

export const load = async ({ fetch, data, depends }) => {
	depends("supabase:auth");

	const db = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session,
		onAuthStateChange() {
			invalidate("supabase:auth");
		},
	});

	const {
		data: { session },
	} = await db.auth.getSession();

	if (session) {
		const { data: profile, error: dbError } = await db
			.from("profiles")
			.select("username")
			.eq("id", session?.user.id);

		if (dbError) {
			throw error(500, dbError.message);
		}
		const username = profile[0].username;

		return { db, session, username };
	}

	return { db, session };
};
