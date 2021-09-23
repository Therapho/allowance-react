import { useQuery } from "react-query"
import { getTaskGroupList } from "../api/getTaskGroupSet";
import taskKeys from "./taskKeys";

export const useTaskGroupSet = ()=>{
    return useQuery(taskKeys.groupSet, getTaskGroupList, { cacheTime:Infinity, staleTime:Infinity});
}