import { useQuery } from "react-query";
import { getOrCreateTaskWeek } from "../api/getOrCreateTaskWeek";
import taskKeys from "./taskKeys";

export const useTaskWeek = (weekStartDate: Date, accountId: number, taskWeekId?: number) => {
  return useQuery(taskKeys.week(weekStartDate), () =>
    getOrCreateTaskWeek(weekStartDate, accountId, taskWeekId),
    { cacheTime: 600000, staleTime: 300000, refetchInterval: 3600000 }
  );
};
