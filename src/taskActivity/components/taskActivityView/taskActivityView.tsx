import { Fragment } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../../../common/stores/profile/types/profileType";
import { Constants } from "../../../common/utilities/constants";
import { useTaskWeek, useTaskActivitySet, useTaskDefinitionSet, useTaskActivityListMutation, useAcceptTaskWeek, useTaskGroupSet } from "../../../common/stores/task/queries";
import taskKeys from "../../../common/stores/task/queries/taskKeys";
import usePutTaskWeek from "../../../common/stores/task/queries/usePutTaskWeek";
import { TaskActivitySet } from "../../../common/stores/task/types/taskActivity";
import { TaskWeek } from "../../../common/stores/task/types/taskWeekType";
import processStatusChange from "../../utilities/processStatusChange";
import { TaskButtonTray } from "../taskButtonTray/taskButtonTray";
import { Task } from "../taskCheckBox/taskCheckbox.props";
import TaskGroupList from "../taskGroupList/taskGroupList";
import fundKeys from "../../../common/stores/fund/queries/fundKeys";
import transactionKeys from "../../../common/stores/transaction/queries/transactionKeys";
import { accountKeys } from "../../../common/stores/account/queries/accountKeys";

export type taskActivityViewProps = {
  selectedDate: Date;
  accountId: number
};

const TaskActivityView = ({ selectedDate,  accountId}: taskActivityViewProps) => {

  ///////////////////////////// initialize utilities
  const history = useHistory();
  const goHome = () => history.push("/");
  const { data: profile } = useProfile();
  
  const { data: taskWeek } = useTaskWeek(selectedDate, accountId);  

  const taskWeekId = taskWeek?.id!;
  const canEdit = taskWeek?.statusId === Constants.Status.Open;
  const canApprove = true;//isParent && today > addDays(selectedDate, 7 );

  ///////////////////////////// Load Data
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
  const { mutate: saveTaskActivityList } = useTaskActivityListMutation(()=>{
    queryClient.invalidateQueries(taskKeys.all);
    
  });
  const { mutate: putTaskWeek } = usePutTaskWeek(goHome);
  const handleSave = () => {
    saveTaskActivityList(taskActivitySet!);
    putTaskWeek(taskWeek!);
  };

  ///////////////////////////// Approve
  const { mutate: acceptTaskWeek } = useAcceptTaskWeek(()=>{
    queryClient.invalidateQueries(fundKeys.all);
    queryClient.invalidateQueries(transactionKeys.all);
    queryClient.invalidateQueries(accountKeys.all);
    goHome();
  });
  const handleApprove = () => acceptTaskWeek(taskWeek!);
  
  return (
    <Fragment>
      <TaskGroupList taskGroupSet={taskGroupSet!} taskActivitySet={taskActivitySet!} onStatusChange={handleStatusChange}/>
    
    <TaskButtonTray
      canEdit={canEdit}
      onSave={handleSave}
      onApprove={handleApprove}
      canApprove={canApprove}
      onCancel={goHome}
      taskWeekValue={taskWeek?.value!}
    />
    </Fragment>
  );
};

export default TaskActivityView;
