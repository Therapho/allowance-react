import { useQuery } from "react-query"
import { getTaskDefinitionSet } from "../api/getTaskDefinitionSet";
import taskKeys from "./taskKeys";

export const useTaskDefinitionSet = ()=>{
    return useQuery(taskKeys.definitionSet, getTaskDefinitionSet, { cacheTime:Infinity, staleTime:Infinity});
}