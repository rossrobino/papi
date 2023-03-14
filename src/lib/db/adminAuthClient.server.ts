import { createClient } from "@supabase/supabase-js";
import type { Database } from "$lib/db/types";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { PRIVATE_SUPABASE_SERVICE_KEY } from "$env/static/private";

const db = createClient<Database>(
	PUBLIC_SUPABASE_URL,
	PRIVATE_SUPABASE_SERVICE_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	},
);

// Access auth admin api
export const adminAuthClient = db.auth.admin;
