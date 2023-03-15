<script lang="ts">
	import ButtonCreatePrompt from "$lib/components/ButtonCreatePrompt.svelte";
	import StarSolid from "$lib/svg/StarSolid.svelte";

	export let data;
</script>

{#if data.profile}
	<div class="flex flex-col gap-4">
		<section>
			<div class="mb-4 flex items-center justify-between gap-4">
				<h2>Prompts</h2>
				{#if data.profile.id === data.session?.user.id}
					<ButtonCreatePrompt />
				{/if}
			</div>
			<div class="grid gap-4 md:grid-cols-3">
				{#if data.profile.prompts.length}
					{#each data.profile.prompts as { name, description, created_at, stars }}
						<div class="card flex flex-col gap-2">
							<h3><a href="/app/prompt/{name}">{name}</a></h3>
							<p class="h-full">{description}</p>
							<div class="flex gap-4">
								<span>{new Date(String(created_at)).toLocaleDateString()}</span>
								<span class="flex items-center gap-1">
									<StarSolid />
									<span>{stars.length}</span>
								</span>
							</div>
						</div>
					{/each}
				{:else}
					<p>No prompts created.</p>
				{/if}
			</div>
		</section>
	</div>
{/if}
