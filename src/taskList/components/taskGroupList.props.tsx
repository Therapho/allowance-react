import { TaskActivityList } from "../stores/types/taskActivity";
import { Task } from "./taskCheckbox.props";

export type TaskGroupListProps = {
    taskActivityList: TaskActivityList;
    canEdit: boolean;
    onStatusChange: (task: Task) => void;
};
