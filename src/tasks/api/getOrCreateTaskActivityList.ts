import axios from "axios";
import { TaskActivity } from "../types/taskActivityType";

export const getOrCreateTaskActivityList = async (weekstartdate:Date, taskWeekId:number)=>{
    const params = { params: { weekstartdate: weekstartdate, taskweekid: taskWeekId } };
    return await (await axios.get<TaskActivity[]>("/api/getorcreatetaskactivitylist", params)).data;
}