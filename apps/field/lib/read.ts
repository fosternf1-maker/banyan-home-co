import { connection } from "next/server";
import { getStore } from "./store.ts";

/** The demo record changes per request and must not be frozen at build time. */
export async function readStore() {
  await connection();
  return getStore();
}
