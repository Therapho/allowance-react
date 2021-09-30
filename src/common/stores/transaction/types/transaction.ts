export type Transaction = {
  description: string;
  amount: number;
  categoryId: number;
  accountId: number;
};

export type TransactionSet = Transaction[];
