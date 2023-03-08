<script lang="ts">
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<h1 class="mb-6">{data.prompt.name}</h1>

<slot />
