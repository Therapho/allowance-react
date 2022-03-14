import apiClient from "../../apiClient";
import { Transaction } from "../types/transaction";

export const updateBalance = async (transaction: Transaction) =>{
    return await apiClient.post("/api/fundset/updatebalance", transaction);
}