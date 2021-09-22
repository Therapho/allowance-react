import { Task } from "../components/taskCheckbox.props";
import { TaskActivityList } from "../stores/types/taskActivity";
import { TaskDefinitionList } from "../stores/types/taskDefinitionType";
import { TaskWeek } from "../stores/types/taskWeekType";

export const processStatusChange = (
  taskActivityList: TaskActivityList,
  task: Task,
  taskWeek: TaskWeek,
  taskDefinitionList: TaskDefinitionList
): [TaskActivityList, TaskWeek] => {
  const newTaskActivityList = [...taskActivityList];
  const index = newTaskActivityList.findIndex(
    (row) => row.id === task.taskActivityId
  )!;
  const oldTaskActivity = newTaskActivityList![index];
  const newTaskActivity = { ...oldTaskActivity };
  const newTaskWeek: TaskWeek = { ...taskWeek };

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
