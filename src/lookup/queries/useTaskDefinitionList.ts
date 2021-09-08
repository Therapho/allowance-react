import { useQuery } from "react-query"
import { getTaskDefinitionList } from "../api/getTaskDefinitionList";

export const useTaskDefinitionList = (enabled = true)=>{
    return useQuery("taskDefinitionList", getTaskDefinitionList, {enabled:enabled});
}