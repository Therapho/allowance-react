import { useQuery } from "react-query";
import { getOrCreateTaskActivityList } from "../api/getOrCreateTaskActivityList";
import taskKeys from "./taskListKeys";

export const useTaskActivityList = (
  weekstartdate: Date,
  taskWeekId: number,
  enabled = true
) => {
  return useQuery(
    taskKeys.activityList(weekstartdate),
    () => getOrCreateTaskActivityList(weekstartdate, taskWeekId),
    { enabled: enabled, cacheTime: 600000, staleTime: 300000 }
  );
};
