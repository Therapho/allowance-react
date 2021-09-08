//import dateUtilities from "../common/dateUtilities";

import { Link } from "@fluentui/react";
import { Suspense } from "react";
import dateUtilities from "../common/dateUtilities";
import { useLookupData } from "../lookup/lookupProvider";
import {
  findTaskDescription,
  TaskDefinition,
} from "../lookup/types/taskDefinitionType";
import { useTaskActivityList } from "./queries/useTaskActivityList";
import { useTaskWeek } from "./queries/useTaskWeek";
import { TaskActivity } from "./types/taskActivityType";

export const Tasks = () => {
  const selectedDate = dateUtilities.getMonday(new Date());
  const { data: taskWeek } = useTaskWeek(selectedDate);
  const taskWeekId = taskWeek?.id!;

  const { data: taskActivityList } = useTaskActivityList(
    selectedDate,
    taskWeekId,
    taskWeekId > 0
  );
  const { taskDefinitionList } = useLookupData();
  return (
    <article className="bodyClass">
      <Link className="left"> Previous</Link>
      <Link className="right"> Next</Link>
      <h3>Tasks for {selectedDate.toLocaleDateString()}</h3>

      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
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
        {taskDefinitionList ? (
          taskActivityList?.map((row: TaskActivity, index: number) => (
            <tr>
              <td>{findTaskDescription(taskDefinitionList, row.taskDefinitionId)}</td>
              <td>{row.mondayStatusId}</td>
              <td>{row.tuesdayStatusId}</td>
              <td>{row.wednesdayStatusId}</td>
              <td>{row.thursdayStatusId}</td>
              <td>{row.fridayStatusId}</td>
              <td>{row.saturdayStatusId}</td>
              <td>{row.sundayStatusId}</td>
            </tr>
          ))
        ) : (
          <div>loading...</div>
        )}
        </tbody>
      </table>
      
    </article>
  );
};
