import axios from "axios";
import { TransactionSet } from "../types/transaction";
export const getTransactionSet = async (accountId: number = 0) => {
  const params = { params: { accountId: accountId } };
  return await (
    await axios.get<TransactionSet>(
      "/api/transactionlogset",
      accountId ? params : undefined
    )
  ).data;
};
