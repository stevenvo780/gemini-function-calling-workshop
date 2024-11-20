const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const dateFormatter = Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export const TransactionItem = ({ transaction }) => {
  return (
    <div className="w-full rounded-md overflow-hidden p-2 px-4 border-2">
      <div className="flex flex-col">
        <span className="font-bold flex gap-1">{transaction.description}</span>
      </div>

      <div className="flex flex-row gap-2">
        <span className={getTextColor(transaction.type)}>
          {currencyFormatter.format(transaction.amount)}
        </span>
        <span>●</span>
        <span className="text-slate-500">
          {dateFormatter.format(new Date(transaction.date))}
        </span>
      </div>
      <kbd className="px-2 py-1.5 text-xs border rounded-md bg-amber-500 text-white font-semibold">
        {transaction.category}
      </kbd>
    </div>
  );
};

function getTextColor(type) {
  if (type === "income") {
    return "text-green-500";
  }

  return "text-red-500";
}
