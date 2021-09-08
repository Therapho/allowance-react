import { useQuery } from "react-query";
import { getOrCreateTaskActivityList } from "../api/getOrCreateTaskActivityList";

export const useTaskActivityList = (weekstartdate:Date, taskWeekId:number, enabled=true)=>{
    const cacheKey = ['taskactivities', {'weekstartdate': weekstartdate}]
    return useQuery(cacheKey,  ()=>getOrCreateTaskActivityList(weekstartdate, taskWeekId), {enabled:enabled});
    
}