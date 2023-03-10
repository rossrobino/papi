<script lang="ts">
	import Head from "$lib/components/Head.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

<Head title={data.prompt.name} description={data.prompt.description} />

<slot />
