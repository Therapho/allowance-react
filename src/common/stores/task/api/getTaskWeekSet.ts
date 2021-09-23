import axios from "axios";
import { TaskWeekSet } from "../types/taskWeekType";
export const getTaskWeekSet = async (startDate:Date, endDate: Date, accountId: number) => {
    const params = { params: { startDate, endDate, accountId } };
    return (await axios.get<TaskWeekSet>("/api/taskweekset", params)).data;
};
