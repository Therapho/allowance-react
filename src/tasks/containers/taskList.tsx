
import { Button, CommandButton, DefaultButton, IStackStyles, Layer, Link, PrimaryButton, Text } from "@fluentui/react";
import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAppState } from "../../app/appStateProvider";
import Card from "../../common/components/card";
import Tray from "../../common/components/tray";
import dateUtilities from "../../common/dateUtilities";
import { Task } from "../components/taskCheckBox";
import TaskGroup from "../components/taskGroup";
import TaskGroupList from "../components/taskGroupList";
import { useTaskActivityList, useTaskActivityListKey } from "../queries/useTaskActivityList";
import { useTaskWeek } from "../queries/useTaskWeek";
import { TaskActivityList } from "../types/taskActivity";


export const TaskPage = () => {
  const queryClient = useQueryClient();

  const selectedDate = dateUtilities.getMonday(new Date());
  const { data: taskWeek } = useTaskWeek(selectedDate);
  const {busy,setBusy} = useAppState();

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
    if(mutateStatus == "success") setBusy(false);
  }, [mutateStatus])
  
  return (
    <article className="bodyClass">
      <Link className="left"> Previous</Link>
      <Link className="right"> Next</Link>
      <h3>Tasks for {selectedDate.toLocaleDateString()}</h3>
      {taskActivityList&&<TaskGroupList
        taskActivityList={taskActivityList!}
        onStatusChange={handleStatusChange}/>}
      <Tray>
        <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
        <DefaultButton>Cancel</DefaultButton>
     </Tray>
    </article>
  );
};
