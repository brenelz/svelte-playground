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
	export let players: Player[];
	export let countries;

	let score = 0;
	let pickedCountry = '';
	let status = null;
	let currentStep = 0;

	$: player = players[currentStep];

	const guessCountry = () => {
		if (player.country.toLowerCase() === pickedCountry.toLowerCase()) {
			score += 1;
			status = { status: 'correct', country: player.country };
		} else {
			status = { status: 'incorrect', country: player.country };
		}
	};

	const nextStep = () => {
		pickedCountry = '';
		currentStep += 1;
		status = null;
	};

	const playAgain = async () => {
		pickedCountry = '';
		players = [];
		const response = await fetch('/api/newGame.json');
		const data = await response.json();
		players = data.players;
		currentStep = 0;
		score = 0;
	};

	function init(el) {
		el.focus();
	}
</script>

<div class="bg-blue-500">
	<div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
		<h2 class="text-3xl font-extrabold text-white sm:text-4xl">
			<span class="block">Tennis Trivia - Next.js Netlify</span>
		</h2>
		<div>
			{#if player}
				<p class="mt-4 text-lg leading-6 text-blue-200">
					What country is the following tennis player from?
				</p>
				<h2 class="text-lg font-extrabold text-white my-5">{player.full_name}</h2>

				{#if status}
					<div class="mt-4 text-lg leading-6 text-white">
						<p>
							You are {status.status}. It is {status.country}
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
				{/if}

				{#if !status}
					<form on:submit|preventDefault={guessCountry}>
						<input
							list="countries"
							type="text"
							class="p-2 outline-none text-black"
							placeholder="Choose Country"
							bind:value={pickedCountry}
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
					{score}
				</p>
			{:else}
				<div>
					<button
						on:click={playAgain}
						autoFocus
						class="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
					>
						Play Again
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
