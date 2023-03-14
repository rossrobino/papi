<script lang="ts">
	import Head from "$lib/components/Head.svelte";

	export let data;
</script>

<Head title={data.prompt.name} description={data.prompt.description} />

<slot />
