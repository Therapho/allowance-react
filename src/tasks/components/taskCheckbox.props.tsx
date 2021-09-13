import { DayOfTheWeek } from "../../common/types/dayOfTheWeek";


export type Task = {
  taskActivityId: number;
  taskStatusId: number;
  day: DayOfTheWeek;
  onStatusChange: (task: Task) => void;
};
