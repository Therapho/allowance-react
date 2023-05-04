import { useQuery } from "react-query";
import { getOrCreateTaskActivitySet } from "../api/getOrCreateTaskActivitySet";
import taskKeys from "./taskKeys";
import { TaskWeek } from "../types/taskWeekType";

export const useTaskActivitySet = (
  weekstartdate: Date,
  taskWeek: TaskWeek|undefined,
  enabled = true
) => {
  return useQuery(    
    taskKeys.activitySet(weekstartdate, taskWeek!.accountId),
    () => getOrCreateTaskActivitySet(weekstartdate, taskWeek!.id!),
    { enabled: enabled, cacheTime: 600000, staleTime: 300000, refetchInterval: 3600000 }
  );
};
