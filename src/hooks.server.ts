import type { Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle = (async ({ event, resolve }) => {
  const response = await resolve(event);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}) satisfies Handle;
