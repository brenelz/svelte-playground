<script context="module" lang="ts">
	import { Player, uniqueCountries } from '$lib/players';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const result = await fetch('/api/newGame.json');
		const data = await result.json();
		const players: Player[] = data.players;

		return {
			props: {
				players,
				countries: uniqueCountries
			}
		};
	};
</script>

<script lang="ts">
	import { gameStore } from '$lib/game';

	import GameCompleted from '../components/GameCompleted.svelte';
	import PlayerCard from '../components/PlayerCard.svelte';

	export let players: Player[];
	export let countries;

	$: player = players[$gameStore.currentStep];
</script>

<div>
	{#if player}
		<PlayerCard {countries} {player} />
	{:else}
		<GameCompleted />
	{/if}
</div>
