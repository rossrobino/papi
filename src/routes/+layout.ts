// src/routes/+layout.ts
import { invalidate } from "$app/navigation";
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from "./$types";
import type { Database } from "$lib/db/types";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
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

	return { db, session };
};
