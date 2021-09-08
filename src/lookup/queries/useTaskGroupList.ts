import { useQuery } from "react-query"
import { getTaskGroupList } from "../api/getTaskGroupList";

export const useTaskGroupList = (enabled = true)=>{
    return useQuery("taskGroups", getTaskGroupList, {enabled:enabled});
}