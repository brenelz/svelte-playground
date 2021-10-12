<script lang="ts">
	import { gameStore } from '$lib/game';
	import type { Player } from '$lib/players';

	export let player: Player;
	export let countries;

	const guessCountry = () => {
		if (player.country.toLowerCase() === $gameStore.pickedCountry.toLowerCase()) {
			$gameStore.score += 1;
			$gameStore.status = { status: 'correct', country: player.country };
		} else {
			$gameStore.status = { status: 'incorrect', country: player.country };
		}
	};

	const nextStep = () => {
		gameStore.set({
			...$gameStore,
			pickedCountry: '',
			currentStep: ($gameStore.currentStep += 1),
			status: null
		});
	};

	function init(el) {
		el.focus();
	}
</script>

<p class="mt-4 text-lg leading-6 text-blue-200">
	What country is the following tennis player from?
</p>
<h2 class="text-lg font-extrabold text-white my-5">{player.full_name}</h2>

{#if $gameStore.status}
	<div class="mt-4 text-lg leading-6 text-white">
		<p>
			You are {$gameStore.status.status}. It is {$gameStore.status.country}
		</p>
		<p>
			<button
				autoFocus
				on:click={nextStep}
				class="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
			>
				Next Player
			</button>
		</p>
	</div>
{:else}
	<form on:submit|preventDefault={guessCountry}>
		<input
			list="countries"
			type="text"
			class="p-2 outline-none text-black"
			placeholder="Choose Country"
			bind:value={$gameStore.pickedCountry}
			use:init
		/>
		<datalist id="countries">
			{#each countries as country}
				<option>{country}</option>
			{/each}
		</datalist>
		<p>
			<button
				class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
				type="submit"
			>
				Guess
			</button>
		</p>
	</form>
{/if}

<p class="mt-4 text-lg leading-6 text-white">
	<strong>Current score:</strong>
	{$gameStore.score}
</p>
