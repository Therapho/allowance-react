import { TaskActivityList } from "../stores/types/taskActivity";
import { Task } from "./taskCheckbox.props";

export type TaskGroupProps = {
  taskActivityList: TaskActivityList;
  onStatusChange: (task: Task) => void;
};
