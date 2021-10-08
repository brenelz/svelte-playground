<script context="module">
	export const prerender = true;
	export const load = async ({ fetch }) => {
		const result = await fetch('https://tennis-trivia.netlify.app/api/newGame');
		const { players } = await result.json();

		return {
			props: {
				players
			}
		};
	};
</script>

<script lang="ts">
	type Player = {
		full_name: string;
	};
	export let players: Player[];
</script>

<svelte:head>
	<title>Tennis Players</title>
</svelte:head>

<p>Tennis players</p>

<ul>
	{#each players as player}
		<li>{player.full_name}</li>
	{/each}
</ul>
