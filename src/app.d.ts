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
	type PromptWithProfileAndStars =
		Database["public"]["Tables"]["prompts"]["Row"] & {
			profiles: Database["public"]["Tables"]["profiles"]["Row"];
			stars: Database["public"]["Tables"]["stars"]["Row"][];
		};
	type PromptWithProfileAndStarsCount =
		Database["public"]["Tables"]["prompts"]["Row"] & {
			profiles: Database["public"]["Tables"]["profiles"]["Row"];
			stars: { count: number }[] | null;
		};
	type ProfileWithPrompts = Database["public"]["Tables"]["profiles"]["Row"] & {
		prompts: PromptWithProfileAndStars[];
	};
	type StarsWithPrompt = Database["public"]["Tables"]["stars"]["Row"] & {
		prompts: PromptWithProfileAndStarsCount;
	};
}

export {};
