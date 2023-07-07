import { PrivateKey, Field, Encryption, Signature, PublicKey } from 'snarkyjs';
import dotenv from "dotenv";

dotenv.config();

const oraclePrivateKeyStr = process.env.ORACLE_PRIVATE_KEY || 'EKExFnUPGkGzu6o2iULX9WxAH4my2wmpTsu5GPonMcA1tTM1Mpy3';

// EDIT THIS
const rolls = [6, 1, 1];
const publicKey = PublicKey.fromBase58('B62qpAT2CdGqReNX5VcfU3YEr1vNGgUGbHuzCk18mpdiukSthEyH9Sm'); // local server public key

const oraclePrivateKey = PrivateKey.fromBase58(oraclePrivateKeyStr);
const encryption = Encryption.encrypt(rolls.map(f => Field(f)), publicKey);
const sig = Signature.create(oraclePrivateKey, [
  Field(3),
  Field(6),
  ...encryption.cipherText
]);

console.log(JSON.stringify({
  publicKey: encryption.publicKey.toJSON(),
  cipherText: encryption.cipherText.toString(),
  signature: sig.toJSON()
}));