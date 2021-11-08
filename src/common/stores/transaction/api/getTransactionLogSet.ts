import apiClient from "../../apiClient";
import { TransactionLogViewSet } from "../types/transactionLogView";
export const getTransactionLogSet = async (accountId?: number) => {
  const params = { params: { accountId: accountId } };
  return await (
    await apiClient.get<TransactionLogViewSet>(
      "/api/transactionlogset",
      accountId ? params : undefined
    )
  ).data;
};
