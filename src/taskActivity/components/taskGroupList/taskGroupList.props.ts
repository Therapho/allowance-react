import { LookupSet } from "../../../common/stores/lookup/types/lookupType";
import { TaskActivitySet } from "../../../common/stores/task/types/taskActivity";
import { Task } from "../taskCheckBox/taskCheckbox.props";

export type TaskGroupListProps = {
    taskGroupSet: LookupSet;
    taskActivitySet: TaskActivitySet,
    onStatusChange: (task:Task)=>void
};
