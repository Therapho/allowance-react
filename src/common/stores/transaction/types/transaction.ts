export type Transaction = {
  date: Date;
  description: string;
  amount: number;
  categoryId: number;
  accountId: number;
};

export type TransactionSet = Transaction[];
