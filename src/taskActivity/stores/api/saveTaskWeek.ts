import axios from "axios";
import { TaskWeek } from "../types/taskWeekType";

export const putTaskWeek = async (taskWeek: TaskWeek) =>{
    return await axios.put("/api/taskweekset", taskWeek);
}