<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ stuff }) => {
		return {};
	};
</script>

<script lang="ts">
	export let blog;
</script>

<h1>{blog.title}</h1>
