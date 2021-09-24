import { useQuery } from "react-query";
import { minutes } from "../../../utilities/constants";
import { getTransactionSet } from "../api/getTransactionSet";
import transactionKeys from "./transactionKeys";

export const useTransactionSet = (accountId?: number) =>
  useQuery(
    transactionKeys.transactionSet(accountId),
    () => getTransactionSet(accountId), {staleTime:    10 * minutes}
  );
