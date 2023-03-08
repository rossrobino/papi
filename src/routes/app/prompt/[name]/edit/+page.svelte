<script lang="ts">
	import type { PageData } from "./$types";
	import Prompt from "../Prompt.svelte";
	import { enhance } from "$app/forms";

	export let data: PageData;
</script>

{#if data.prompt}
	<div class="flex flex-col gap-4">
		<Prompt editing={true} prompt={data.prompt} />
		<form method="POST" action="?/delete" use:enhance>
			<button>Delete</button>
		</form>
	</div>
{/if}
