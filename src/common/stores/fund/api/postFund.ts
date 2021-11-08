import axios from "axios";
import { Fund } from "../types/fund";

export const postFund = async (fund: Fund) => {
  return await axios.post("/api/fundset", fund);
};
