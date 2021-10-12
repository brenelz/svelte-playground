import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ request, resolve }) => {
	request.locals.user = { name: 'Brenley' };

	const response = await resolve(request);

	return {
		...response,
		headers: {
			...response.headers,
			'x-custom-header': 'potato'
		}
	};
};
