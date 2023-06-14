import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { PrivateKey, Field, Encryption, Signature, PublicKey, isReady } from 'snarkyjs';
import { oraclePrivateKeyStr } from '../../../../lib/server/utils.js';

/** @type {import('./$types').RequestHandler} */
export async function GET(request: RequestEvent) {
  await isReady;
  const requestPublicKey = request.params.publicKeyStr || '';
  const publicKey = PublicKey.fromBase58(requestPublicKey);
  if (!publicKey) {
    throw error(400, "Invalid Params, Public Key not valid");
  }

  const n = Math.floor(Number(request.url.searchParams.get('n'))) || 1;
  const sides = Math.floor(Number(request.url.searchParams.get('sides'))) || 6;

  const rolls: number[] = [];
  for (let i = 0; i < n; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
  }
  console.info(`API DICE: n=${n} sides=${sides} rand=${rolls}`)
  const oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);
  const encryption = Encryption.encrypt(rolls.map(f => Field(f)), publicKey);
  const sig = Signature.create(oraclePrivateKey, [
    Field(n),
    Field(sides),
    ...encryption.cipherText
  ]);

  return new Response(JSON.stringify({
    publicKey: encryption.publicKey.toJSON(),
    cipherText: encryption.cipherText.toString(),
    signature: sig.toJSON()
  }));
}
