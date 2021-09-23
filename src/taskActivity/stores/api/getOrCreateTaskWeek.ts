import axios from "axios";
import { TaskWeek } from "../types/taskWeekType";

export const getOrCreateTaskWeek = async (weekstartdate:Date)=>{
    const params = { params: { weekstartdate: weekstartdate } };
    const response = await (await axios.get<TaskWeek>("/api/getorcreatetaskweek", params));
    return response.data;
}