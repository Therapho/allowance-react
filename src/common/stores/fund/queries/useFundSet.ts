import { useQuery } from "react-query";
import { minutes } from "../../../utilities/constants";
import { getFundSet } from "../api/getFundSet";
import fundKeys from "./fundKeys";

export const useFundSet = (accountId: number, enabled = true) => {
  return useQuery(fundKeys.fundSet(accountId), () =>
    getFundSet(accountId), {enabled, staleTime:5*minutes}
  );
};
