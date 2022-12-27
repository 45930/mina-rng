import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { PrivateKey, Field, Encryption, Signature, PublicKey } from 'snarkyjs';
import { isSnarkyLoaded, loadSnarky, oraclePrivateKeyStr } from '$lib/server/utils';

/** @type {import('./$types').RequestHandler} */
export async function GET(request: RequestEvent) {
  if (!isSnarkyLoaded) {
    await loadSnarky();
  }

  const executorPublicKey = request.url.searchParams.get('executor') || '';
  console.log(executorPublicKey);
  const rand = Math.floor(Math.random() * 1_000_000);
  const oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);
  const encryption = Encryption.encrypt([Field(rand)], PublicKey.fromBase58(executorPublicKey));
  const sig = Signature.create(oraclePrivateKey, encryption.cipherText);

  return new Response(JSON.stringify({
    publicKey: encryption.publicKey.toJSON(),
    cipherText: encryption.cipherText.toString(),
    signature: sig.toJSON()
  }));
}
