
import apiClient from "../../apiClient";
import { Fund } from "../types/fund"

export const updateFund = async (fund:Fund) =>{
 return await apiClient.put("/api/fundset", fund);
}