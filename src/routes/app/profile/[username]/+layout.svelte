<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<div class="flex items-center gap-6 mb-6">
	{#if data.profile.github}
		<a href="https://github.com/{data.profile.github}">
			<img
				src="https://github.com/{data.profile.github}.png"
				class="h-24 rounded-full"
				alt={data.profile.github}
			/>
		</a>
	{/if}
	<h1>@{data.profile.username}</h1>
</div>

<slot />
