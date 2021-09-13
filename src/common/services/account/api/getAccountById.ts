import axios from "axios";
import { Account } from "../types/accountType";

export const getAccountById = async (userId: string | undefined) => {
    const params = { params: { userid: userId } };
    const { data } = await axios.get<Account[]>("/api/accountset", params);
    return data[0];
};
