import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET(_request: RequestEvent) {
  const random = Math.floor(Math.random() * 1_000_000);

  return new Response(String(random));
}
