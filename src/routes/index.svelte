<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { writable } from 'svelte/store';

	let count = writable(0);

	count.subscribe((value) => {
		console.log(value);
	});

	count.set(2);
</script>

<svelte:head>
	<title>Index</title>
</svelte:head>

<p>Index page</p>
