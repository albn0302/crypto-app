import Image from "next/image";
import BuyButton from "../components/BuyButton";
import Transactions from "@/components/Transactions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getData() {
  const res = await fetch("https://api.coincap.io/v2/assets");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

type crypto = {
  id: string;
  symbol: string;
  name: string;
  currentPriceUsd: string;
  changePercent24Hr: string;
};

export default async function Home() {
  const { data } = await getData();
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Transactions api={data} />
      <Table>
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
          {data.map((crypto: crypto) => (
            <TableRow key={crypto.id} className="space-x-12">
              <TableCell className="font-medium">{crypto.symbol}</TableCell>
              <TableCell>{crypto.name}</TableCell>
              <TableCell>
                {Number(crypto.priceUsd).toLocaleString("fi-FI", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell>
              <TableCell
                className={
                  Number(crypto.changePercent24Hr) > 0
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {Number(crypto.changePercent24Hr).toFixed(2)}
              </TableCell>
              <TableCell>
                <BuyButton
                  symbol={crypto.symbol}
                  currentPriceUsd={crypto.priceUsd}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
