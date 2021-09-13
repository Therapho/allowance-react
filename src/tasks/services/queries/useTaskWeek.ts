import { useQuery } from "react-query";
import { getOrCreateTaskWeek } from "../api/getOrCreateTaskWeek";

export const useTaskWeek = (weekstartdate:Date)=>{
    const cacheKey = ['taskWeek', {'weekstartdate': weekstartdate}]
    return useQuery(cacheKey,  ()=>getOrCreateTaskWeek(weekstartdate));
    
}