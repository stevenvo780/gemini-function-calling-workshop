"use client";

import Image from "next/image";
import { TransactionList } from "./components/TransactionList";
import { Toolbar } from "./components/Toolbar";
import { useCallback, useEffect, useState } from "react";
import { CreateTransactionProvider } from "./providers/CreateTransactionProvider";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onTransactionCreated = useCallback((transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/transaction")
      .then((response) => response.json())
      .then(setTransactions)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <div className="border-slate-900 bg-slate-900 text-slate-50 w-fit rounded-b-md border ml-2">
        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row gap-2 items-center p-2 rounded-md"
        >
          <Image
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Deploy now
        </a>
      </div>
      <main className="w-full flex flex-col justify-center items-center px-2">
        <h1 className="text-2xl font-bold text-slate-900 mt-4 text-center">
          💸 Gemini Transactions Manager
        </h1>
        <h3 className="text-base text-zinc-500">
          DevFest Medellín 2024 - Gemini Workshop
        </h3>
        <div className="flex flex-col w-full md:w-3/4 mt-2">
          <CreateTransactionProvider>
            <Toolbar onTransactionCreated={onTransactionCreated} />
            <TransactionList items={transactions} isLoading={isLoading} />
          </CreateTransactionProvider>
        </div>
      </main>
    </div>
  );
}
