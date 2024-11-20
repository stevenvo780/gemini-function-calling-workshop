import { TransactionItem } from "./TransactionItem";

export const TransactionList = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-zinc-500 flex flex-col">
        <p className="w-full text-center">Loading transactions...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-zinc-500 flex flex-col">
        <p className="w-full text-center">No transactions to display 💰</p>
      </div>
    );
  }

  return (
    <ul className="w-full flex flex-col gap-2">
      {items.map((item, index) => (
        <TransactionItem key={index} transaction={item} />
      ))}
    </ul>
  );
};
