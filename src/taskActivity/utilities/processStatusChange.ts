import { Constants } from "../../common/utilities/constants";
import { Task } from "../components/taskCheckBox/taskCheckbox.props";
import { TaskActivitySet } from "../../common/stores/task/types/taskActivity";
import { TaskDefinitionSet } from "../../common/stores/task/types/taskDefinition";

export const processStatusChange = (
  taskActivityList: TaskActivitySet,
  task: Task,
  taskDefinitionList: TaskDefinitionSet
): [TaskActivitySet, number] => {
  const newTaskActivityList = [...taskActivityList];
  const index = newTaskActivityList.findIndex(
    (row) => row.id === task.taskActivityId
  )!;
  const oldTaskActivity = newTaskActivityList![index];
  const newTaskActivity = { ...oldTaskActivity };
  var valueChange = 0;

  const taskDefinition = taskDefinitionList?.find(item => item.id === newTaskActivity.taskDefinitionId);
 

  // if (!newTaskActivity) return;
  switch (task.day) {
    case "Monday":
      newTaskActivity.mondayStatusId = task.taskStatusId;
      valueChange += taskValueChange(oldTaskActivity.mondayStatusId, task.taskStatusId);
      break;
    case "Tuesday":
      newTaskActivity.tuesdayStatusId = task.taskStatusId;
      valueChange += taskValueChange(oldTaskActivity.tuesdayStatusId, task.taskStatusId);
      break;
    case "Wednesday":
      newTaskActivity.wednesdayStatusId = task.taskStatusId;
      valueChange += taskValueChange(oldTaskActivity.wednesdayStatusId, task.taskStatusId);
      break;
    case "Thursday":
      newTaskActivity.thursdayStatusId = task.taskStatusId;
      valueChange += taskValueChange(oldTaskActivity.thursdayStatusId, task.taskStatusId);
      break;
    case "Friday":
      newTaskActivity.fridayStatusId = task.taskStatusId;
      valueChange += taskValueChange(oldTaskActivity.fridayStatusId, task.taskStatusId);
      break;
    case "Saturday":
      newTaskActivity.saturdayStatusId = task.taskStatusId;
      valueChange += taskValueChange(oldTaskActivity.saturdayStatusId, task.taskStatusId);
      break;
    case "Sunday":
      newTaskActivity.sundayStatusId = task.taskStatusId;
      valueChange += taskValueChange(oldTaskActivity.sundayStatusId, task.taskStatusId);
      break;
  }

  newTaskActivityList[index] = newTaskActivity;
  return [newTaskActivityList, valueChange];

  function taskValueChange(oldStatusId:number, newStatusId:number) :number {
    if (newStatusId === Constants.ActivityStatus.Complete)
      return taskDefinition?.value!;

    else if(oldStatusId === Constants.ActivityStatus.Complete)
      return - taskDefinition?.value!;
    else return 0;
  }
};
export default processStatusChange;