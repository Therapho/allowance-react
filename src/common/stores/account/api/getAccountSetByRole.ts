import apiClient from "../../apiClient";
import { AccountSet } from "../types/accountType";

export const getAccountByRole = async (role: number | undefined) => {
    const params = { params: { roleid: role } };
    const { data } = await apiClient.get<AccountSet>("/api/accountset", params);
    return data;
};
