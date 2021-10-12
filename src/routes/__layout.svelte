<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getBlogData } from '$lib/blog';

	export const load: Load = async ({ page }) => {
		const blogData = await getBlogData();
		const blog = blogData.find((data) => data.id == parseInt(page.params.id));

		return {
			stuff: {
				blog
			}
		};
	};
</script>

<script>
	import '../app.css';
</script>

<div class="container p-10 max-w-xl m-auto">
	<h1 class="text-3xl pb-4">My App</h1>
	<ul class="pb-8">
		<li><a href="/">Home</a></li>
		<li><a href="/another-page">Another</a></li>
		<li><a href="/tennis-players">Tennis Players</a></li>
	</ul>
	<slot />
</div>
