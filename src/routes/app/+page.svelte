<script lang="ts">
	import ButtonCreatePrompt from "$lib/components/ButtonCreatePrompt.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1 class="mb-6">Dashboard</h1>

<section>
	<div class="flex justify-between items-center mb-8">
		<h2>New</h2>
		<ButtonCreatePrompt />
	</div>
	<div class="flex flex-col gap-4">
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
