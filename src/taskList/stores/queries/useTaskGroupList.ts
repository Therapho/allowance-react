import { useQuery } from "react-query"
import { getTaskGroupList } from "../api/getTaskGroupList";
import taskKeys from "./taskListKeys";

export const useTaskGroupList = ()=>{
    return useQuery(taskKeys.groupList, getTaskGroupList, { cacheTime:Infinity, staleTime:Infinity});
}