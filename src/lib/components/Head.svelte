<script lang="ts">
	export let title = "";
	export let description: string | null;
	export let tagline = "";
	let className = "";
	export { className as class };
</script>

<svelte:head>
	<title>papi - {title}</title>
	<meta name="description" content={description} />
</svelte:head>

<h1 class="mb-8 {className}">{title}</h1>

{#if tagline}
	<h2 class="mb-4 text-lg">{tagline}</h2>
{/if}
