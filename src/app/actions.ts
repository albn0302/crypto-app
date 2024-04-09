"use server";
import { db } from "@/utilities/db";

export async function addTransaction(
  unitsPurchased: number,
  symbol: string,
  currentPriceUsd: string
) {
  console.log("buying", unitsPurchased, "of", symbol);
  console.log(currentPriceUsd);

  await db(
    'INSERT INTO crypto ("unitsPurchased", "symbol", "currentPriceUsd") VALUES ($1, $2, $3)',
    [unitsPurchased, symbol, Number.parseFloat(currentPriceUsd)]
  );
}

export async function getTransaction() {
  const res = await db("SELECT * FROM crypto");
  return res.rows;
}
