const groupTransactionsByDate = (transactions, type) => {
  const groupedTransactions = {};
  if (transactions?.length) {
    transactions.forEach((transaction) => {
      if (type === "Amount" && transaction.status) {
        const date = transaction.updatedAt.split("T")[0];
        if (groupedTransactions[date]) {
          groupedTransactions[date] += +transaction.Amount;
        } else {
          groupedTransactions[date] = +transaction.Amount;
        }
      } else {
        const date = transaction.createdAt.split("T")[0];
        if (groupedTransactions[date]) {
          groupedTransactions[date] += transaction.amount;
        } else {
          groupedTransactions[date] = transaction.amount;
        }
      }
    });
  }

  return Object.entries(groupedTransactions);
};
export { groupTransactionsByDate };
