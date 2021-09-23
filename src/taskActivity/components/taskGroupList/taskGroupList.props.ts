import { LookupSet } from "../../../common/stores/lookup/types/lookupType";
import { TaskActivitySet } from "../../stores/types/taskActivity";
import { Task } from "../taskCheckBox/taskCheckbox.props";

export type TaskGroupListProps = {
    taskGroupSet: LookupSet;
    taskActivitySet: TaskActivitySet,
    onStatusChange: (task:Task)=>void
};
