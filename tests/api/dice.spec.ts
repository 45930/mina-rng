import { test, expect, request, type APIRequestContext } from '@playwright/test';
import { Field, PrivateKey, PublicKey, Signature, Encryption, Group } from 'snarkyjs';
import { oraclePrivateKeyStr } from '../../src/lib/server/utils.js';

const parseRequest = (async (url: string, n: number, sides: number) => {
  const resp = await context.fetch(url)
  const oracleData: ApiResponse = await resp.json();
  const sig: Signature = Signature.fromJSON(oracleData.signature);
  const ct: Field[] = oracleData.cipherText.split(',').map(f => Field(f));
  const signatureInput: Field[] = [Field(n), Field(sides), ...ct];
  const group: Group | null = Group.fromJSON(oracleData.publicKey);
  if (!group) {
    return {
      sig,
      signatureInput,
      plaintext: []
    }
  }
  const plaintext = Encryption.decrypt({ publicKey: group, cipherText: ct }, executorPrivateKey).toString().split(',');
  return {
    sig,
    signatureInput,
    plaintext
  }
});

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
    const n = 1;
    const sides = 6;
    const { sig, signatureInput, plaintext } = await parseRequest(`http://127.0.0.1:5173/api/dice/${executorPublicKey.toBase58()}`, n, sides);
    expect(sig.verify(oraclePublicKey, signatureInput).toBoolean()).toBeTruthy();
    expect(plaintext.length).toBe(n);
    plaintext.forEach((roll) => {
      expect(Number(roll)).toBeGreaterThanOrEqual(1);
      expect(Number(roll)).toBeLessThanOrEqual(sides);
    });
  });

  test("Custom Params", async () => {
    const n = 5;
    const sides = 12;
    const { sig, signatureInput, plaintext } = await parseRequest(`http://127.0.0.1:5173/api/dice/${executorPublicKey.toBase58()}?n=${n}&sides=${sides}`, n, sides);
    expect(sig.verify(oraclePublicKey, signatureInput).toBoolean()).toBeTruthy();
    expect(plaintext.length).toBe(n);
    plaintext.forEach((roll) => {
      expect(Number(roll)).toBeGreaterThanOrEqual(1);
      expect(Number(roll)).toBeLessThanOrEqual(sides);
    });
  });
});
