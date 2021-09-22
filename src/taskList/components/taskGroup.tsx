import { TaskGroupProps } from "./taskGroup.props";
import { useTaskDefinitionList } from "../stores/queries/useTaskDefinitionList";
import { TaskActivity } from "../stores/types/taskActivity";
import { findTaskDescription } from "../stores/types/taskDefinitionType";
import { TaskCheckBox } from "./taskCheckBox";
import TaskGroupStyles from "./taskGroup.styles";

const TaskGroup = ({ taskActivityList, onStatusChange }: TaskGroupProps) => {
  const { data: taskDefinitionList } = useTaskDefinitionList();
  return (
    <table>
      <thead>
        <tr>
          <th className={TaskGroupStyles.descriptionColumn}>&nbsp;</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
          <th>S</th>
        </tr>
      </thead>
      <tbody>
        {taskActivityList?.map((row: TaskActivity, index: number) => (
          <tr key={index}>
            <td>
              {findTaskDescription(taskDefinitionList!, row.taskDefinitionId)}
            </td>
            <td>
              <TaskCheckBox
                taskStatusId={row.mondayStatusId}
                taskActivityId={row.id!}
                day="Monday"
                onStatusChange={onStatusChange}
              />
            </td>
            <td>
              <TaskCheckBox
                taskStatusId={row.tuesdayStatusId}
                taskActivityId={row.id!}
                day="Tuesday"
                onStatusChange={onStatusChange}
              />
            </td>
            <td>
              <TaskCheckBox
                taskStatusId={row.wednesdayStatusId}
                taskActivityId={row.id!}
                day="Wednesday"
                onStatusChange={onStatusChange}
              />{" "}
            </td>
            <td>
              <TaskCheckBox
                taskStatusId={row.thursdayStatusId}
                taskActivityId={row.id!}
                day="Thursday"
                onStatusChange={onStatusChange}
              />
            </td>
            <td>
              <TaskCheckBox
                taskStatusId={row.fridayStatusId}
                taskActivityId={row.id!}
                day="Friday"
                onStatusChange={onStatusChange}
              />
            </td>
            <td>
              <TaskCheckBox
                taskStatusId={row.saturdayStatusId}
                taskActivityId={row.id!}
                day="Saturday"
                onStatusChange={onStatusChange}
              />
            </td>
            <td>
              <TaskCheckBox
                taskStatusId={row.sundayStatusId}
                taskActivityId={row.id!}
                day="Sunday"
                onStatusChange={onStatusChange}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TaskGroup;
