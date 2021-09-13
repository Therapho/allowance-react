import { useQuery } from "react-query"
import { getTaskGroupList } from "../api/getTaskGroupList";

export const useTaskGroupList = ()=>{
    return useQuery("taskGroups", getTaskGroupList, { cacheTime:Infinity, staleTime:Infinity});
}