import axios from "axios";
import { TaskActivitySet } from "../types/taskActivity"

export const putTaskActivityList = async (putTaskActivitySet: TaskActivitySet) =>{
    return await axios.put("/api/taskactivityset", putTaskActivitySet);
}