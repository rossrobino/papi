import { SupabaseClient, Session } from "@supabase/supabase-js";
import type { Database } from "$lib/db/types";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			db: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
	type PromptWithProfile = Database["public"]["Tables"]["prompts"]["Row"] & {
		profiles: Database["public"]["Tables"]["profiles"]["Row"];
	};
	type ProfileWithPrompts = Database["public"]["Tables"]["profiles"]["Row"] & {
		prompts: Database["public"]["Tables"]["prompts"]["Row"][];
	};
}

export {};
