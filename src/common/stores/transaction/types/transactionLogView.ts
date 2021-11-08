import { TransactionLog } from "./transactionLog";

export type TransactionLogView = TransactionLog & {
  targetFundName?: string;
  sourceFundName?: string;
  callingAccountName?: string;
  targetAccountName?: string;
};


export type TransactionLogViewSet = TransactionLogView[];
