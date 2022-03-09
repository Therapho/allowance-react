export type TransactionLog = {
  date: Date;
  description: string;
  amount: number;
  categoryId: number;  
  callingAccountId?: number;
  targetAccountId: number;
  targetFundId?:number;
  sourceFundId?:number;
  previousAmount?:number;
};

export type TransactionLogSet = TransactionLog[];
