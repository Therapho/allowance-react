
import apiClient from "../../apiClient";
import { TaskWeek } from "../types/taskWeekType";

export const getOrCreateTaskWeek = async (weekstartdate:Date, accountId: number, taskWeekId?:number)=>{
    const params = { params: { weekstartdate: weekstartdate, accountId, taskWeekId: taskWeekId } };
    const response = await (await apiClient.get<TaskWeek>("/api/getorcreatetaskweek", params));
    return response.data;
}