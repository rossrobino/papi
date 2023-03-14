<script lang="ts">
	import ButtonCreatePrompt from "$lib/components/ButtonCreatePrompt.svelte";

	export let data;
</script>

{#if data.profile}
	{#if data.profile.id === data.session?.user.id}
		<div class="mb-8 flex justify-end md:-mt-[5.5rem] md:mb-14">
			<a class="btn" href="/app/profile/{data.profile.username}/edit">
				Edit profile
			</a>
		</div>
	{/if}
	<div class="flex flex-col gap-4">
		<section>
			<div class="mb-4 flex items-center justify-between gap-4">
				<h2>Prompts</h2>
				{#if data.profile.id === data.session?.user.id}
					<ButtonCreatePrompt />
				{/if}
			</div>
			<div class="mb-4 grid gap-4 md:grid-cols-3">
				{#each data.profile.prompts as { name, description }}
					<div class="card">
						<h3 class="mb-2"><a href="/app/prompt/{name}">{name}</a></h3>
						<p>{description}</p>
					</div>
				{/each}
			</div>
		</section>
	</div>
{/if}
