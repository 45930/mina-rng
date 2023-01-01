import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { PrivateKey, Field, Encryption, Signature, PublicKey } from 'snarkyjs';
import { isSnarkyLoaded, loadSnarky, oraclePrivateKeyStr } from '$lib/server/utils';

/** @type {import('./$types').RequestHandler} */
export async function GET(request: RequestEvent) {
  if (!isSnarkyLoaded) {
    await loadSnarky();
  }

  const publicKey = request.params.publicKey || '';
  const min = Math.floor(Number(request.url.searchParams.get('min'))) || 0;
  const max = Math.floor(Number(request.url.searchParams.get('max'))) || 999999;
  if (max <= min) {
    throw ("Invalid Params, max must be greater than min")
  }
  const range = max - min + 1;
  const rand = Math.floor(Math.random() * range + min);
  const oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);
  const encryption = Encryption.encrypt([Field(rand)], PublicKey.fromBase58(publicKey));
  const sig = Signature.create(oraclePrivateKey, [
    Field(min),
    Field(max),
    ...encryption.cipherText
  ]);

  return new Response(JSON.stringify({
    publicKey: encryption.publicKey.toJSON(),
    cipherText: encryption.cipherText.toString(),
    signature: sig.toJSON()
  }));
}
