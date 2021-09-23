import axios from "axios";
import { TaskActivitySet } from "../types/taskActivity";

export const getOrCreateTaskActivitySet = async (weekstartdate:Date, taskWeekId:number)=>{
    const params = { params: { weekstartdate: weekstartdate, taskweekid: taskWeekId } };
    return await (await axios.get<TaskActivitySet>("/api/getorcreatetaskactivitylist", params)).data;
}