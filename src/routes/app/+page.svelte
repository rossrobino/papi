<script lang="ts">
	import ButtonCreatePrompt from "$lib/components/ButtonCreatePrompt.svelte";
	import Head from "$lib/components/Head.svelte";

	export let data;
</script>

<Head title="Dashboard" description="Browse popular prompts. " />

<section>
	<div class="mb-8 flex items-center justify-between gap-4">
		<h2>New</h2>
		<ButtonCreatePrompt />
	</div>
	<div class="overflow-x-auto">
		{#if data.prompts}
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Created</th>
						<th>User</th>
					</tr>
				</thead>
				<tbody>
					{#each data.prompts as { name, description, created_at, profiles }}
						<tr>
							<td><a href="/app/prompt/{name}">{name}</a></td>
							<td>{description}</td>
							<td>{new Date(String(created_at)).toLocaleDateString()}</td>
							<td>
								<a href="/app/profile/{profiles.username}">
									@{profiles.username}
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</section>
