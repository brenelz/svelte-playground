import type { RequestHandler } from '@sveltejs/kit';
import { top100Players } from '../../lib/players';

export const get: RequestHandler = async () => {
	const randomizedPlayers = top100Players.sort((a, b) => 0.5 - Math.random());
	const players = randomizedPlayers.slice(0, 5);

	return {
		status: 200,
		body: {
			players
		}
	};
};
