import { DayOfTheWeek } from "../../../common/utilities/dayOfTheWeek";

export type Task = {
  taskActivityId: number;
  taskStatusId: number;
  day: DayOfTheWeek;
  onStatusChange: (task: Task) => void;
};
