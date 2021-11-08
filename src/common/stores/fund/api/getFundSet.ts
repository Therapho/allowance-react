import axios from "axios";
import apiClient from "../../apiClient";
import { FundSet } from "../types/fund";

export const getFundSet = async (accountId?: number) => {
  const params = { params: { accountId } };
  return await (await apiClient.get<FundSet>("/api/fundset", params)).data;
};
