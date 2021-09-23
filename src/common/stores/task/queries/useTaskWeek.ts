import { useQuery } from "react-query";
import { getOrCreateTaskWeek } from "../api/getOrCreateTaskWeek";
import taskKeys from "./taskKeys";

export const useTaskWeek = (weekStartDate: Date) => {
  return useQuery(taskKeys.week(weekStartDate), () =>
    getOrCreateTaskWeek(weekStartDate)
  );
};
