<script lang="ts">
	import Head from "$lib/components/Head.svelte";
	import StarSolid from "$lib/svg/StarSolid.svelte";

	export let data;
</script>

<Head title="Dashboard" description="Browse popular prompts. " />

<div class="flex flex-col gap-8">
	<section>
		<div class="mb-8 flex items-center justify-between gap-4">
			<h2>New</h2>
		</div>
		<div class="overflow-x-auto">
			{#if data.newPrompts}
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Created</th>
							<th>User</th>
							<th>Stars</th>
						</tr>
					</thead>
					<tbody>
						{#each data.newPrompts as { name, description, created_at, profiles, stars }}
							<tr>
								<td><a href="/app/prompt/{name}">{name}</a></td>
								<td>{description}</td>
								<td>{new Date(String(created_at)).toLocaleDateString()}</td>
								<td>
									<a href="/app/profile/{profiles.username}">
										@{profiles.username}
									</a>
								</td>
								<td>
									<span class="flex items-center gap-1">
										<StarSolid />
										{stars.length}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</section>

	<section>
		<div class="mb-8 flex items-center justify-between gap-4">
			<h2>Trending</h2>
		</div>
		<div class="grid gap-4 md:grid-cols-3">
			{#each data.trendingPrompts as { name, stars, description, created_at, profiles }}
				<div class="card flex flex-col gap-2">
					<h3>
						<a href="/app/prompt/{name}">{name}</a>
					</h3>
					<p class="h-full">{description}</p>
					<div class="flex gap-4">
						<span>{new Date(String(created_at)).toLocaleDateString()}</span>
						<a href="/app/profile/{profiles.username}">
							@{profiles.username}
						</a>
						<span class="flex items-center gap-1">
							<StarSolid />
							<span>
								{stars?.length}
							</span>
						</span>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
