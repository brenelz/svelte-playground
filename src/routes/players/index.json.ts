import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const result = await fetch('https://tennis-trivia.netlify.app/api/newGame');
	const { players } = await result.json();

	const playersWithNames = players.map((player) => {
		return {
			full_name: player.full_name
		};
	});

	return {
		status: 200,
		body: {
			players: playersWithNames
		}
	};
};
