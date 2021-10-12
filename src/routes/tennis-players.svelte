<script context="module">
	export const load = async ({ fetch }) => {
		const result = await fetch('players.json');
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

	let listOfPlayers = players;
	let name = '';

	const addPlayer = () => {
		listOfPlayers = [...listOfPlayers, { full_name: name }];
		name = '';
	};
</script>

<svelte:head>
	<title>Tennis Players</title>
</svelte:head>

<p class="text-2xl underline">Tennis players</p>

<form on:submit|preventDefault={addPlayer}>
	<ul>
		{#each listOfPlayers as player}
			<li>{player.full_name}</li>
		{/each}
		<li class="pt-4">
			<input
				class="p-2 py-3 rounded text-black"
				placeholder="player name"
				type="text"
				bind:value={name}
			/>
			<button type="submit" class="btn btn-primary">Add Player</button>
		</li>
	</ul>
</form>
