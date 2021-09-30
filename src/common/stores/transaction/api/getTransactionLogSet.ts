import apiClient from "../../apiClient";
import { TransactionLogSet } from "../types/transactionLog";
export const getTransactionLogSet = async (accountId?: number) => {
  const params = { params: { accountId: accountId } };
  return await (
    await apiClient.get<TransactionLogSet>(
      "/api/transactionlogset",
      accountId ? params : undefined
    )
  ).data;
};
