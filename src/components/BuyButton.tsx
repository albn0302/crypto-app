"use client";
import React from "react";
import { addTransaction } from "@/app/actions";

function buy(symbol: string, currentPriceUsd: string) {
  const units = prompt(`How many ${symbol}?`);
  addTransaction(Number(units), symbol, currentPriceUsd);
}

export default function BuyButton(props: {
  symbol: string;
  currentPriceUsd: string;
}) {
  return (
    <button onClick={() => buy(props.symbol, props.currentPriceUsd)}>
      Buy
    </button>
  );
}
