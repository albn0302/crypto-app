import { getTransaction } from "@/app/actions";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function calculateResults(oldPrice, newPrice) {
  return ((newPrice - oldPrice) / oldPrice) * 100;
}

export default async function Transactions(props) {
  const data = await getTransaction();
  console.log(data);

  return (
    <Table className="w-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Symbol</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Change 24Hr</TableHead>
          <TableHead className="text-right">Buy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((crypto) => (
          <TableRow key={crypto.id} className="space-x-12">
            <TableCell className="font-medium">{crypto.symbol}</TableCell>
            <TableCell>{crypto.units}</TableCell>
            <TableCell>
              {Number(crypto.currentPriceUsd).toLocaleString("fi-FI", {
                style: "currency",
                currency: "USD",
              })}
            </TableCell>
            <TableCell className="text-right">
              {calculateResults(
                crypto.currentPriceUsd,
                props.api.filter((crypto) => crypto.symbol === crypto.symbol)[0]
                  .currentPriceUsd
              ).toFixed(2)}
              %
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
