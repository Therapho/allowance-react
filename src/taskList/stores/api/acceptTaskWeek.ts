import axios from "axios";
import { TaskWeek } from "../types/taskWeekType";

export const acceptTaskWeek = async (taskWeek: TaskWeek) =>{
    return await axios.post("/api/accepttaskweek", taskWeek);
}