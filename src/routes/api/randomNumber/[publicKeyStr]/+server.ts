import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { PrivateKey, Field, Encryption, Signature, PublicKey } from 'snarkyjs';
import { isSnarkyLoaded, loadSnarky, oraclePrivateKeyStr } from '$lib/server/utils';

/** @type {import('./$types').RequestHandler} */
export async function GET(request: RequestEvent) {
  if (!isSnarkyLoaded) {
    await loadSnarky();
  }

  const publicKey = PublicKey.fromBase58(request.params.publicKeyStr!);
  if (!publicKey) {
    throw error(400, "Invalid Params, Public Key not valid");
  }

  const min = Math.floor(Number(request.url.searchParams.get('min'))) || 0;
  const max = Math.floor(Number(request.url.searchParams.get('max'))) || 999999;
  if (max <= min) {
    throw error(400, "Invalid Params, max must be greater than min");
  }
  const range = max - min + 1;
  const rand = Math.floor(Math.random() * range + min);
  console.info(`API RANDOM NUMBER: min=${min} max=${max} rand=${rand}`)
  const oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);
  const encryption = Encryption.encrypt([Field(rand)], publicKey);
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
