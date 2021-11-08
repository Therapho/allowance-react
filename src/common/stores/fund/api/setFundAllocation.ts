import axios from "axios"
import { FundSet } from "../types/fund"

export const setFundAllocation = async (fundSet:FundSet) =>{
 return await axios.put("/api/fundset/setallocation", fundSet);
}