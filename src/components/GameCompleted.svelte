<script lang="ts">
	import { gameStore } from '$lib/game';

	const playAgain = async () => {
		gameStore.set({
			...$gameStore,
			pickedCountry: '',
			currentStep: 0,
			status: null
		});
	};
</script>

<div>
	<button
		on:click={playAgain}
		autoFocus
		class="outline-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
	>
		Play Again
	</button>
</div>
