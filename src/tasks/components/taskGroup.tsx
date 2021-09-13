import "./taskGroup.scss";
import { useTaskDefinitionList } from "../queries/useTaskDefinitionList";
import { TaskActivity, TaskActivityList } from "../types/taskActivity";
import { findTaskDescription } from "../types/taskDefinitionType";
import { Task, TaskCheckBox } from "./taskCheckBox";
import { Overlay, ProgressIndicator, Shimmer } from "@fluentui/react";

type TaskGroupProps = {
  taskActivityList: TaskActivityList;
  onStatusChange: (task: Task) => void;
};
const TaskGroup = ({ taskActivityList, onStatusChange }: TaskGroupProps) => {
  const { data: taskDefinitionList, isSuccess } = useTaskDefinitionList();
  
  const handleStatusChange = (task: Task) => {
    onStatusChange(task);
  };
  if(true)
  return (
    
    <div className="gridTable">
      <table>
        <thead>
          <tr>
            <th className="descriptionColumn">&nbsp;</th>
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
                <td>
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
    </div>


  )
  else return (<h3>Loading...</h3>)
};
export default TaskGroup;
