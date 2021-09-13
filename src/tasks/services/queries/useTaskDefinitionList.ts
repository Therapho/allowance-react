import { useQuery } from "react-query"
import { getTaskDefinitionList } from "../api/getTaskDefinitionList";

export const useTaskDefinitionList = ()=>{
    return useQuery("taskDefinitionList", getTaskDefinitionList, { cacheTime:Infinity, staleTime:Infinity});
}