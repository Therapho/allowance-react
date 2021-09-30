export type TransactionLog = {
  date: Date;
  description: string;
  amount: number;
  categoryId: number;
  accountId: number;
};

export type TransactionLogSet = TransactionLog[];
