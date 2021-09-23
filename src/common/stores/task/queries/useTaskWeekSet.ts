import { useQuery } from "react-query";
import { getTaskWeekSet } from "../api/getTaskWeekSet";
import taskKeys from "./taskKeys";

export const useTaskWeekSet = (
  startDate: Date,
  endDate: Date,
  accountId: number,
  enabled = true
) => {
  return useQuery(taskKeys.weekSet(startDate, endDate, accountId), () =>
    getTaskWeekSet(startDate, endDate, accountId), {enabled}
  );
};
