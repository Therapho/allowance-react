import { useQuery } from "react-query";
import { minutes } from "../../../utilities/constants";
import { getTransactionLogSet } from "../api/getTransactionLogSet";
import transactionKeys from "./transactionKeys";

export const useTransactionSet = (accountId?: number) =>
  useQuery(
    transactionKeys.transactionLogSet(accountId),
    () => getTransactionLogSet(accountId), {staleTime:    10 * minutes}
  );
