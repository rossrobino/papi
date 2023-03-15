<script lang="ts">
	import StarSolid from "$lib/svg/StarSolid.svelte";

	export let data;
</script>

{#if data.profile}
	<div class="flex flex-col gap-4">
		<section>
			<div class="mb-4 flex items-center justify-between gap-4">
				<h2>Stars</h2>
			</div>
			<div class="grid gap-4 md:grid-cols-3">
				{#if data.stars.length}
					{#each data.stars as star}
						<div class="card flex flex-col gap-2">
							<h3>
								<a href="/app/prompt/{star.prompts.name}">
									{star.prompts.name}
								</a>
							</h3>
							<p class="h-full">{star.prompts.description}</p>
							<div class="flex gap-4">
								<span>
									{new Date(
										String(star.prompts.created_at),
									).toLocaleDateString()}
								</span>
								<span class="flex items-center gap-1">
									<StarSolid />
									<span>{star.prompts.stars?.length}</span>
								</span>
							</div>
						</div>
					{/each}
				{:else}
					<p>No starred prompts.</p>
				{/if}
			</div>
		</section>
	</div>
{/if}
