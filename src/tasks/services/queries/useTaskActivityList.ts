import { useQuery } from "react-query";
import { getOrCreateTaskActivityList } from "../api/getOrCreateTaskActivityList";

export const useTaskActivityListKey = (weekstartdate: Date) => {
  return ["taskactivityList", { weekstartdate: weekstartdate }];
};
export const useTaskActivityList = (
  weekstartdate: Date,
  taskWeekId: number,
  enabled = true
) => {
  const cacheKey = useTaskActivityListKey(weekstartdate);
  return useQuery(
    cacheKey,
    () => getOrCreateTaskActivityList(weekstartdate, taskWeekId),
    { enabled: enabled, cacheTime: 600000, staleTime: 300000}
  );
};
