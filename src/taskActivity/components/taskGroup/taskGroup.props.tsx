
import { TaskActivitySet } from "../../../common/stores/task/types/taskActivity";
import { Task } from "../taskCheckBox/taskCheckbox.props";

export type TaskGroupProps = {
  taskActivityList: TaskActivitySet;
  onStatusChange: (task: Task) => void;
};
