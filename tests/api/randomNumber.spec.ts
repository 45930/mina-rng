import { test, expect, request, type APIRequestContext } from '@playwright/test';
import { Field, isReady, PrivateKey, PublicKey, Signature, Encryption, Group } from 'snarkyjs';
import { oraclePrivateKeyStr } from '../../src/lib/server/utils.js';

await isReady;

// B62qm1fco5NmfzFu7b6YC9snnhTNLemCXfJJCM5mdeXEWW3seTtzWfY 
// EKFM7iJ9rRb7Pz6txZEiGVvnw1yQPuhpBM1H5CtNqWVNXKS4Lbcy
let executorPrivateKey: PrivateKey;
let executorPublicKey: PublicKey;
let context: APIRequestContext;
let oraclePrivateKey: PrivateKey;
let oraclePublicKey: PublicKey;
test.describe("Random Number", () => {
  test.beforeAll(async () => {
    executorPrivateKey = PrivateKey.fromBase58('EKFM7iJ9rRb7Pz6txZEiGVvnw1yQPuhpBM1H5CtNqWVNXKS4Lbcy');
    executorPublicKey = executorPrivateKey.toPublicKey();
    context = await request.newContext();
    oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);
    oraclePublicKey = oraclePrivateKey.toPublicKey();
  });

  test("Default Params", async () => {
    const min = 0;
    const max = 999_999;
    const resp = await context.fetch(`http://127.0.0.1:5173/api/randomNumber/${executorPublicKey.toBase58()}`)
    const oracleData: ApiResponse = await resp.json();
    const sig: Signature = Signature.fromJSON(oracleData.signature);
    const ct: Field[] = oracleData.cipherText.split(',').map(f => Field(f));
    const signatureInput: Field[] = [Field(min), Field(max), ...ct];
    const group: Group = Group.fromJSON(oracleData.publicKey);
    const plaintext = Encryption.decrypt({ publicKey: group, cipherText: ct }, executorPrivateKey).toString();
    expect(sig.verify(oraclePublicKey, signatureInput).toBoolean()).toBeTruthy();
    expect(Number(plaintext)).toBeGreaterThanOrEqual(min);
    expect(Number(plaintext)).toBeLessThanOrEqual(max);
  });

  test("Custom Params", async () => {
    const min = 5;
    const max = 7;
    const resp = await context.fetch(`http://127.0.0.1:5173/api/randomNumber/${executorPublicKey.toBase58()}?min=${min}&max=${max}`)
    const oracleData: ApiResponse = await resp.json();
    const sig: Signature = Signature.fromJSON(oracleData.signature);
    const ct: Field[] = oracleData.cipherText.split(',').map(f => Field(f));
    const signatureInput: Field[] = [Field(min), Field(max), ...ct];
    const group: Group = Group.fromJSON(oracleData.publicKey);
    const plaintext = Encryption.decrypt({ publicKey: group, cipherText: ct }, executorPrivateKey).toString();
    expect(sig.verify(oraclePublicKey, signatureInput).toBoolean()).toBeTruthy();
    expect(Number(plaintext)).toBeGreaterThanOrEqual(min);
    expect(Number(plaintext)).toBeLessThanOrEqual(max);
  });
});
