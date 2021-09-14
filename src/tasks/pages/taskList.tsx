import { DefaultButton, Link, mergeStyleSets, PrimaryButton } from "@fluentui/react";
import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { appButton, appElementLeft, appElementRight } from "../../app/app.styles";
import { useAppState } from "../../app/providers/appStateProvider";
import Tray from "../../common/components/tray";
import dateUtilities from "../../common/utilities/dateUtilities";
import { Task } from "../components/taskCheckbox.props";
import TaskGroupList from "../components/taskGroupList";
import { useTaskActivityList, useTaskActivityListKey } from "../services/queries/useTaskActivityList";
import { useTaskWeek } from "../services/queries/useTaskWeek";
import { TaskActivityList } from "../services/types/taskActivity";
import { taskListStyles } from "./taskList.styles";


export const TaskPage = () => {
 
  const queryClient = useQueryClient();

  const selectedDate = dateUtilities.getMonday(new Date());
  const { data: taskWeek } = useTaskWeek(selectedDate);
  const {setBusy} = useAppState();

  const taskWeekId = taskWeek?.id!;

  const { data: taskActivityList } = useTaskActivityList(
    selectedDate,
    taskWeekId,
    taskWeekId > 0
  );
  
  const taskActivityListKey = useTaskActivityListKey(selectedDate);

  const handleStatusChange = (task: Task) => {
    const newTaskActivityList = [...taskActivityList!];
    const index = newTaskActivityList.findIndex(
      (row) => row.id === task.taskActivityId
    )!;
    const oldTaskActivity = newTaskActivityList![index];
    const newTaskActivity = { ...oldTaskActivity };
    console.log(`page.handleChange ${oldTaskActivity.id}`);

    if (!newTaskActivity) return;
    switch (task.day) {
      case "Monday": newTaskActivity.mondayStatusId = task.taskStatusId;
      break;
      case "Tuesday": newTaskActivity.tuesdayStatusId = task.taskStatusId;
      break;
      case "Wednesday": newTaskActivity.wednesdayStatusId = task.taskStatusId;
      break;
      case "Thursday": newTaskActivity.thursdayStatusId = task.taskStatusId;
      break;
      case "Friday": newTaskActivity.fridayStatusId = task.taskStatusId;
      break;
      case "Saturday": newTaskActivity.saturdayStatusId = task.taskStatusId;
      break;
      case "Sunday": newTaskActivity.sundayStatusId = task.taskStatusId;
      break;
    }

    newTaskActivityList[index] = newTaskActivity;
    queryClient.setQueryData<TaskActivityList>(
      taskActivityListKey,
      newTaskActivityList
    );
  };
  const {mutate, status:mutateStatus, } = useMutation((data:TaskActivityList) => axios.put("/api/taskactivityset", data));
  

  const handleSave = () =>{
    setBusy(true);
    mutate(taskActivityList!);
  }
  useEffect(()=>{
    if(mutateStatus === "success") setBusy(false);
  }, [mutateStatus, setBusy])
  
  return (
    <main>
      <Link className={appElementLeft}> Previous</Link>
      <Link className={appElementRight}> Next</Link>
      <h3>Tasks for {selectedDate.toLocaleDateString()}</h3>
      {taskActivityList&&<TaskGroupList
        taskActivityList={taskActivityList!}
        onStatusChange={handleStatusChange}/>}
      <Tray>
        <PrimaryButton onClick={handleSave} styles={appButton}>Save</PrimaryButton>
        <DefaultButton styles={appButton}>Cancel</DefaultButton>
     </Tray>
    </main>
  );
};
