import { QueryClient, QueryKey } from "react-query";
import { Task } from "../components/taskCheckbox.props";
import { TaskActivityList } from "../services/types/taskActivity";

export const processStatusChange = (
  taskActivityList: TaskActivityList,
  task: Task,
  queryClient: QueryClient,
  taskActivityListKey: QueryKey
) => {
  const newTaskActivityList = [...taskActivityList];
  const index = newTaskActivityList.findIndex(
    (row) => row.id === task.taskActivityId
  )!;
  const oldTaskActivity = newTaskActivityList![index];
  const newTaskActivity = { ...oldTaskActivity };
  console.log(`page.handleChange ${oldTaskActivity.id}`);

  if (!newTaskActivity) return;
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

  queryClient.setQueryData<TaskActivityList>(
    taskActivityListKey,
    newTaskActivityList
  );
};
