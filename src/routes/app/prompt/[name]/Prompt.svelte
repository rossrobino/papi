<script lang="ts">
	import { enhance } from "$app/forms";
	import type { Database } from "$lib/db/types";

	type PromptWithProfile = Database["public"]["Tables"]["prompts"]["Row"] & {
		profiles: Database["public"]["Tables"]["profiles"]["Row"];
	};

	export let prompt: PromptWithProfile;

	export let editing = false;
</script>

<form method="POST" action="?/edit" use:enhance>
	<input type="hidden" name="id" value={prompt.id} />
	{#if editing}
		<section class="flex flex-col gap-4">
			<h2>Name</h2>
			<input type="text" name="name" value={prompt.name} />
		</section>
	{/if}
	<div class="grid gap-4 sm:grid-cols-3">
		<section class="flex flex-col gap-4">
			<h2>About</h2>
			<a href="/" class="font-semibold">@{prompt.profiles?.username}</a>
			<div class="font-semibold">
				{new Date(String(prompt.created_at)).toLocaleDateString()}
			</div>
			{#if editing}
				<textarea
					name="description"
					class="h-full"
					value={prompt.description}
				/>
			{:else}
				<div class="whitespace-pre-wrap">{prompt.description}</div>
			{/if}
		</section>
		<section class="flex flex-col gap-4 sm:col-span-2">
			<h2>Prompt</h2>
			{#if editing}
				<textarea class="h-96" name="prompt" value={prompt.prompt} />
			{:else}
				<blockquote>{prompt.prompt}</blockquote>
			{/if}
		</section>
	</div>

	{#if editing}
		<button>Submit</button>
	{/if}
</form>
