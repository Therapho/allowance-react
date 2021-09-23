import { Constants } from "../../common/utilities/constants";
import { Task } from "../components/taskCheckBox/taskCheckbox.props";
import { TaskActivitySet } from "../../common/stores/task/types/taskActivity";
import { TaskDefinitionSet } from "../../common/stores/task/types/taskDefinition";
import { TaskWeek } from "../../common/stores/task/types/taskWeekType";

export const processStatusChange = (
  taskActivityList: TaskActivitySet,
  task: Task,
  taskWeek: TaskWeek,
  taskDefinitionList: TaskDefinitionSet
): [TaskActivitySet, TaskWeek] => {
  const newTaskActivityList = [...taskActivityList];
  const index = newTaskActivityList.findIndex(
    (row) => row.id === task.taskActivityId
  )!;
  const oldTaskActivity = newTaskActivityList![index];
  const newTaskActivity = { ...oldTaskActivity };
  const newTaskWeek: TaskWeek = { ...taskWeek };

  const taskDefinition = taskDefinitionList?.find(item => item.id === newTaskActivity.taskDefinitionId);
  if(task.taskStatusId === Constants.ActivityStatus.Complete)
    newTaskWeek.value += taskDefinition?.value!;
    else
    newTaskWeek.value -= taskDefinition?.value!;

  // if (!newTaskActivity) return;
  switch (task.day) {
    case "Monday":
      newTaskActivity.mondayStatusId = task.taskStatusId;
      break;
    case "Tuesday":
      newTaskActivity.tuesdayStatusId = task.taskStatusId;
      break;
    case "Wednesday":
      newTaskActivity.wednesdayStatusId = task.taskStatusId;
      break;
    case "Thursday":
      newTaskActivity.thursdayStatusId = task.taskStatusId;
      break;
    case "Friday":
      newTaskActivity.fridayStatusId = task.taskStatusId;
      break;
    case "Saturday":
      newTaskActivity.saturdayStatusId = task.taskStatusId;
      break;
    case "Sunday":
      newTaskActivity.sundayStatusId = task.taskStatusId;
      break;
  }

  newTaskActivityList[index] = newTaskActivity;
  return [newTaskActivityList, newTaskWeek];
};
export default processStatusChange;