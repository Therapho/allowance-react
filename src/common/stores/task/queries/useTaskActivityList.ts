import { useQuery } from "react-query";
import { getOrCreateTaskActivitySet } from "../api/getOrCreateTaskActivitySet";
import taskKeys from "./taskKeys";

export const useTaskActivitySet = (
  weekstartdate: Date,
  taskWeekId: number,
  enabled = true
) => {
  return useQuery(
    taskKeys.activitySet(weekstartdate),
    () => getOrCreateTaskActivitySet(weekstartdate, taskWeekId),
    { enabled: enabled, cacheTime: 600000, staleTime: 300000 }
  );
};
