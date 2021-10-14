import apiClient from "../../apiClient";
import { TaskWeekSet } from "../types/taskWeekType";
export const getTaskWeekSet = async (startDate:Date, endDate: Date, accountId?: number) => {
    const params = { params: { startDate, endDate, accountId } };
   
    return (await apiClient.get<TaskWeekSet>("/api/taskweekset", params)).data;
};

