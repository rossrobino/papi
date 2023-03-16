<script lang="ts">
	import type { Session } from "@supabase/supabase-js";
	import { page } from "$app/stores";

	let className = "";
	export { className as class };
	export let session: Session | null;
	export let username = "";

	$: currentPage = $page.route.id?.split("/").slice(0, 4).join("/");
	$: if (currentPage === "/app/profile/[username]") {
		if (username === $page.params.username) {
			currentPage = `/app/profile/${username}`;
		}
	}
</script>

<div class="flex gap-2 {className}">
	<a href="/app" class="tab" class:tab-selected={currentPage === "/app"}>
		Dashboard
	</a>
	<a
		href="/app/create"
		class="tab"
		class:tab-selected={currentPage === "/app/create"}
	>
		Create
	</a>
	{#if session}
		<a
			href="/app/profile/{username}"
			class="tab"
			class:tab-selected={currentPage === `/app/profile/${username}`}
		>
			@{username}
		</a>
	{/if}
</div>
