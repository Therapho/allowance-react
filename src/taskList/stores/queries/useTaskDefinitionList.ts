import { useQuery } from "react-query"
import { getTaskDefinitionList } from "../api/getTaskDefinitionList";
import taskKeys from "./taskListKeys";

export const useTaskDefinitionList = ()=>{
    return useQuery(taskKeys.definitionList, getTaskDefinitionList, { cacheTime:Infinity, staleTime:Infinity});
}