import {
  DetailsListLayoutMode,
  SelectionMode,
  ShimmeredDetailsList,
} from "@fluentui/react";
import { useAppState } from "../../../app/context/appStateProvider";
import { useTaskDefinitionSet } from "../../../common/stores/task/queries";
import { taskGroupColumns } from "./taskGroup.columns";
import { TaskGroupProps } from "./taskGroup.props";
import TaskGroupStyles from "./taskGroup.styles";

const TaskGroup = ({ taskActivityList, onStatusChange }: TaskGroupProps) => {
  const { data: taskDefinitionSet } = useTaskDefinitionSet();
  const {isDesktop} = useAppState();
  const columns = taskGroupColumns(taskDefinitionSet!,isDesktop, onStatusChange);
  console.log(isDesktop)

  return (
    <ShimmeredDetailsList
      items={taskActivityList || []}
      columns={columns}
      cellStyleProps={TaskGroupStyles.cellProps}
      compact
      enableShimmer={!taskActivityList}
      selectionMode={SelectionMode.none}
      layoutMode={DetailsListLayoutMode.fixedColumns}
      isHeaderVisible={true}
      className={TaskGroupStyles.list}/>
  )
  
};
export default TaskGroup;
