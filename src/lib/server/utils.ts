import dotenv from "dotenv";

dotenv.config();

export const oraclePrivateKeyStr = process.env.ORACLE_PRIVATE_KEY || '';
