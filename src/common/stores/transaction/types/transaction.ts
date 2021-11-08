export type Transaction = {
  description: string;
  amount: number;
  categoryId: number;
  targetAccountId: number;
  targetFundId: number;
  sourceFundId?: number;
};

export type TransactionSet = Transaction[];
