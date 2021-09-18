import { useMutation } from "react-query"
import { putTaskActivityList } from "../api/putTaskActivityList"
import { TaskActivityList } from "../types/taskActivity"

export const useTaskActivityListMutation = ()=>{
    return useMutation((data:TaskActivityList) => putTaskActivityList(data));
}