import { Fragment } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../../../common/stores/profile/types/profileType";
import { Constants } from "../../../common/utilities/constants";
import { useTaskWeek, useTaskActivitySet, useTaskDefinitionSet, useTaskActivityListMutation, useAcceptTaskWeek, useTaskGroupSet } from "../../stores/queries";
import taskKeys from "../../stores/queries/taskKeys";
import usePutTaskWeek from "../../stores/queries/usePutTaskWeek";
import { TaskActivitySet } from "../../stores/types/taskActivity";
import { TaskWeek } from "../../stores/types/taskWeekType";
import processStatusChange from "../../utilities/processStatusChange";
import { TaskButtonTray } from "../taskButtonTray/taskButtonTray";
import { Task } from "../taskCheckBox/taskCheckbox.props";
import TaskGroupList from "../taskGroupList/taskGroupList";
import { taskActivityViewProps } from "./taskActivityView.props";


const TaskActivityView = ({ selectedDate }: taskActivityViewProps) => {
  const { data: taskWeek } = useTaskWeek(selectedDate);
  const taskWeekId = taskWeek?.id!;
  const canEdit = taskWeek?.statusId === Constants.Status.Open;

  ///////////////////////////// initialize utilities
  const history = useHistory();
  const goHome = () => history.push("/");
  const { data: profile } = useProfile();
  const isParent = checkIfParent(profile);

  ///////////////////////////// Load Date
  const { data: taskActivitySet } = useTaskActivitySet(
    selectedDate,
    taskWeekId,
    taskWeekId > 0
  );

  const {data: taskGroupSet} = useTaskGroupSet();
  const { data: taskDefinitionSet } = useTaskDefinitionSet();

  ///////////////////////////// Update data state
  const queryClient = useQueryClient();

  const handleStatusChange = (task: Task) => {
    if (!canEdit) return;
    const [newTaskActivityList, newTaskWeek] = processStatusChange(
      taskActivitySet!,
      task,
      taskWeek!,
      taskDefinitionSet!
    );
    queryClient.setQueryData<TaskActivitySet>(
      taskKeys.activitySet(selectedDate),
      newTaskActivityList
    );
    queryClient.setQueryData<TaskWeek>(
      taskKeys.week(selectedDate),
      newTaskWeek
    );
  };

  //////////////////////////// Save Data
  const { mutate: saveTaskActivityList } = useTaskActivityListMutation();
  const { mutate: putTaskWeek } = usePutTaskWeek(goHome);
  const handleSave = () => {
    saveTaskActivityList(taskActivitySet!);
    putTaskWeek(taskWeek!);
  };

  ///////////////////////////// Approve
  const { mutate: acceptTaskWeek } = useAcceptTaskWeek(goHome);
  const handleApprove = () => acceptTaskWeek(taskWeek!);
  
  return (
    <Fragment>
      <TaskGroupList taskGroupSet={taskGroupSet!} taskActivitySet={taskActivitySet!} onStatusChange={handleStatusChange}/>
    
    <TaskButtonTray
      canEdit={canEdit}
      onSave={handleSave}
      onApprove={handleApprove}
      canApprove={isParent}
      onCancel={goHome}
      taskWeekValue={taskWeek?.value!}
    />
    </Fragment>
  );
};

export default TaskActivityView;
