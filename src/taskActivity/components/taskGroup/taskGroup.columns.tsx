import { IColumn } from "@fluentui/react";
import { TaskActivity } from "../../../common/stores/task/types/taskActivity";
import {
  findTaskDescription,
  TaskDefinitionSet,
} from "../../../common/stores/task/types/taskDefinition";
import { DayOfTheWeek } from "../../../common/utilities/dayOfTheWeek";
import { TaskCheckBox } from "../taskCheckBox/taskCheckBox";
import { Task } from "../taskCheckBox/taskCheckbox.props";
import TaskGroupStyles from "./taskGroup.styles";



const getColumn = (
  day: DayOfTheWeek,
  isDesktop: boolean,
  onStatusChange: (task: Task) => void
) => {
  let name = "";
  let taskStatusId = 0;

  const column: IColumn = {
    key: day,
    name: name,
    fieldName: day,
    minWidth: isDesktop?42:22,
    className: TaskGroupStyles.cell,
    onRender: (taskActivity: TaskActivity) => {
      switch (day) {
        case "Monday":
          name = "M";
          taskStatusId = taskActivity.mondayStatusId;
          break;
        case "Tuesday":
          name = "T";
          taskStatusId = taskActivity.tuesdayStatusId;
          break;
        case "Wednesday":
          name = "W";
          taskStatusId = taskActivity.wednesdayStatusId;
          break;
        case "Thursday":
          name = "T";
          taskStatusId = taskActivity.thursdayStatusId;
          break;
        case "Friday":
          name = "F";
          taskStatusId = taskActivity.fridayStatusId;
          break;
        case "Saturday":
          name = "S";
          taskStatusId = taskActivity.saturdayStatusId;
          break;
        case "Sunday":
          name = "S";
          taskStatusId = taskActivity.sundayStatusId;
          break;
      }
      return (
        <TaskCheckBox
          taskStatusId={taskStatusId}
          taskActivityId={taskActivity.id!}
          day={day}
          onStatusChange={onStatusChange}
        />
      );
    },
  };
  return column;
};

export const taskGroupColumns = (
  taskDefinitionSet: TaskDefinitionSet,
  isDesktop:boolean,
  onStatusChange: (task: Task) => void
) => [
  {
    key: "description",
    name: " ",
    fieldName: "description",
    minWidth: 120,
    maxWidth: isDesktop?400:140,
    onRender: (taskActivity: TaskActivity) =>
      findTaskDescription(taskDefinitionSet!, taskActivity.taskDefinitionId),
  },
  getColumn("Monday", isDesktop, onStatusChange), 
  getColumn("Tuesday", isDesktop, onStatusChange),
  getColumn("Wednesday", isDesktop, onStatusChange),
  getColumn("Thursday", isDesktop, onStatusChange),
  getColumn("Friday", isDesktop, onStatusChange),
  getColumn("Saturday",isDesktop,  onStatusChange),
  getColumn("Sunday", isDesktop, onStatusChange),

];
