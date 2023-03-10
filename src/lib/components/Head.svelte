<script lang="ts">
	export let title: string = "";
	export let description: string | null;
	let className = "";
	export { className as class };
</script>

<svelte:head>
	<title>papi - {title}</title>
	<meta name="description" content={description} />
</svelte:head>

<h1 class="mb-8 {className}">{title}</h1>
