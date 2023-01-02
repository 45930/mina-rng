import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

import { PrivateKey, Field, Encryption, Signature, PublicKey } from 'snarkyjs';
import { isSnarkyLoaded, loadSnarky, oraclePrivateKeyStr } from '$lib/server/utils';

import newrelic from 'newrelic';

/** @type {import('./$types').RequestHandler} */
export async function GET(request: RequestEvent) {
  await newrelic.startWebTransaction(request.url.toString(), async () => {
    if (!isSnarkyLoaded) {
      await loadSnarky();
    }

    const publicKey = request.params.publicKey || '';
    const min = Math.floor(Number(request.url.searchParams.get('min'))) || 0;
    const max = Math.floor(Number(request.url.searchParams.get('max'))) || 999999;
    if (max <= min) {
      throw error(400, "Invalid Params, max must be greater than min");
    }
    newrelic.recordCustomEvent(
      'RANDOM_NUMBER_API',
      {
        min,
        max
      }
    );
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
  });
}
