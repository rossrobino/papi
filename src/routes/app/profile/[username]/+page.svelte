<script lang="ts">
	import ButtonCreatePrompt from "$lib/components/ButtonCreatePrompt.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

{#if data.profile}
	<div class="flex flex-col gap-4">
		<section>
			<div class="mb-4 flex items-center justify-between">
				<h2>Prompts</h2>
				{#if data.profile.id === data.session?.user.id}
					<ButtonCreatePrompt />
				{/if}
			</div>
			<div class="mb-4 grid grid-cols-3 gap-4">
				{#each data.profile.prompts as { name, description }}
					<div class="card">
						<h3 class="mb-2"><a href="/app/prompt/{name}">{name}</a></h3>
						<p>{description}</p>
					</div>
				{/each}
			</div>
		</section>
		{#if data.profile.id === data.session?.user.id}
			<div class="flex justify-start">
				<a class="btn" href="/app/profile/{data.profile.username}/edit">
					Edit profile
				</a>
			</div>
		{/if}
	</div>
{/if}
