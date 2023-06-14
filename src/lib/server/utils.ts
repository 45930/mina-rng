import { isReady } from "snarkyjs";
import dotenv from "dotenv";

dotenv.config();

export const oraclePrivateKeyStr = process.env.ORACLE_PRIVATE_KEY || '';

export let isSnarkyLoaded = false;
export async function loadSnarky() {
  await isReady;

  isSnarkyLoaded = true;
}
