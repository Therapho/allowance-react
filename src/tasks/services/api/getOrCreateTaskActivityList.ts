import axios from "axios";
import { TaskActivityList } from "../types/taskActivity";

export const getOrCreateTaskActivityList = async (weekstartdate:Date, taskWeekId:number)=>{
    const params = { params: { weekstartdate: weekstartdate, taskweekid: taskWeekId } };
    return await (await axios.get<TaskActivityList>("/api/getorcreatetaskactivitylist", params)).data;
}