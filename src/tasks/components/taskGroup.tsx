import { TaskGroupProps } from "./taskGroup.props";
import { useTaskDefinitionList } from "../services/queries/useTaskDefinitionList";
import { TaskActivity } from "../services/types/taskActivity";
import { findTaskDescription } from "../services/types/taskDefinitionType";
import { TaskCheckBox } from "./taskCheckBox";
import { Task } from "./taskCheckbox.props";
import TaskGroupStyles  from "./taskGroup.styles";


const TaskGroup = ({ taskActivityList, onStatusChange }: TaskGroupProps) => {

  const { data: taskDefinitionList } = useTaskDefinitionList();
  
  const handleStatusChange = (task: Task) => {
    onStatusChange(task);
  };
  if(true)
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
          {(
            taskActivityList?.map((row: TaskActivity, index: number) => (
              <tr key={index}>
                <td >
                  {findTaskDescription(
                    taskDefinitionList!,
                    row.taskDefinitionId
                  )}
                </td>
                <td>
                  <TaskCheckBox
                    taskStatusId={row.mondayStatusId}
                    taskActivityId={row.id!}
                    day="Monday"
                    onStatusChange={handleStatusChange}
                  />
                </td>
                <td>
                  <TaskCheckBox
                    taskStatusId={row.tuesdayStatusId}
                    taskActivityId={row.id!}
                    day="Tuesday"
                    onStatusChange={handleStatusChange}
                  />
                </td>
                <td>
                  <TaskCheckBox
                    taskStatusId={row.wednesdayStatusId}
                    taskActivityId={row.id!}
                    day="Wednesday"
                    onStatusChange={handleStatusChange}
                  />{" "}
                </td>
                <td>
                  <TaskCheckBox
                    taskStatusId={row.thursdayStatusId}
                    taskActivityId={row.id!}
                    day="Thursday"
                    onStatusChange={handleStatusChange}
                  />
                </td>
                <td>
                  <TaskCheckBox
                    taskStatusId={row.fridayStatusId}
                    taskActivityId={row.id!}
                    day="Friday"
                    onStatusChange={handleStatusChange}
                  />
                </td>
                <td>
                  <TaskCheckBox
                    taskStatusId={row.saturdayStatusId}
                    taskActivityId={row.id!}
                    day="Saturday"
                    onStatusChange={handleStatusChange}
                  />
                </td>
                <td>
                  <TaskCheckBox
                    taskStatusId={row.sundayStatusId}
                    taskActivityId={row.id!}
                    day="Sunday"
                    onStatusChange={handleStatusChange}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>     


  )
  else return (<h3>Loading...</h3>)
};
export default TaskGroup;
