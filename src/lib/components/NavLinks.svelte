<script lang="ts">
	import type { Session } from "@supabase/supabase-js";

	let className = "";
	export { className as class };
	export let session: Session | null;
	export let username = "";
</script>

<div class="flex gap-6 {className}">
	<a href="/app">Dashboard</a>
	<a href="/app/create">Create</a>
	{#if session}
		<a href="/app/profile/{username}">@{username}</a>
	{/if}
</div>
