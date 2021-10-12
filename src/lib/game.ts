import { writable } from 'svelte/store';

type Status = {
	status: string;
	country: string;
};

export type GameState = {
	currentStep: number;
	score: number;
	pickedCountry: string;
	status: Status | null;
};

export const initialGameState: GameState = {
	currentStep: 0,
	score: 0,
	pickedCountry: '',
	status: null
};

export const gameStore = writable(initialGameState);
