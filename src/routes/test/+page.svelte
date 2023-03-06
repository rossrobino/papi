<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  $: ({ user, tableData } = data);
</script>

<div>Protected content for {user?.email}</div>
<pre>{JSON.stringify(tableData, null, 2)}</pre>
<pre>{JSON.stringify(user, null, 2)}</pre>
