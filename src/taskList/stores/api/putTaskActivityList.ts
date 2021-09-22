import axios from "axios";
import { TaskActivityList } from "../types/taskActivity"

export const putTaskActivityList = async (putTaskActivityList: TaskActivityList) =>{
    return await axios.put("/api/taskactivityset", putTaskActivityList);
}