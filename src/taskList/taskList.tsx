import { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { useAppState } from "../app/providers/appStateProvider";
import { Constants } from "../common/utilities/constants";
import dateUtilities from "../common/utilities/dateUtilities";
import { DateRange } from "./components/dateRange";
import { TaskButtonTray } from "./components/taskButtonTray";
import { Task } from "./components/taskCheckbox.props";
import TaskGroupList from "./components/taskGroupList";
import taskKeys from "./stores/queries/taskListKeys";
import { useAcceptTaskWeekMutation } from "./stores/queries/useAcceptTaskWeekMutation";
import { useTaskActivityList } from "./stores/queries/useTaskActivityList";
import { useTaskActivityListMutation } from "./stores/queries/useTaskActivityListMutation";
import { useTaskDefinitionList } from "./stores/queries/useTaskDefinitionList";
import { useTaskWeek } from "./stores/queries/useTaskWeek";
import { TaskActivityList } from "./stores/types/taskActivity";
import { TaskWeek } from "./stores/types/taskWeekType";
import { processStatusChange } from "./utilities/processStatusChange";

export const TaskPage = () => {
  ///////////////////////////// initialize state
  const { setBusy, setError } = useAppState();
  const history = useHistory();
  const queryClient = useQueryClient();
  const goHome = () => history.push("/");
  const makeBusy = () => setBusy(true);
  const freeBusy = () => setBusy(false);

  const [selectedDate, setSelectedDate] = useState(
    dateUtilities.getMonday(new Date())
  );

  const { data: taskWeek } = useTaskWeek(selectedDate);
  const taskWeekId = taskWeek?.id!;
  const isOpen = taskWeek?.statusId === Constants.Status.Open;

  const { data: taskDefinitionList } = useTaskDefinitionList();

  const { data: taskActivityList } = useTaskActivityList(
    selectedDate,
    taskWeekId,
    taskWeekId > 0
  );

  ///////////////////////////// Update data state
  const handleStatusChange = (task: Task) => {
    const [newTaskActivityList, newTaskWeek] = processStatusChange(
      taskActivityList!,
      task,
      taskWeek!,
      taskDefinitionList!
    );
    queryClient.setQueryData<TaskActivityList>(
      taskKeys.activityList(selectedDate),
      newTaskActivityList
    );
    queryClient.setQueryData<TaskWeek>(
      taskKeys.week(selectedDate),
      newTaskWeek
    );
  };

  //////////////////////////// Save Data
  const { mutate: saveTaskActivityList } = useTaskActivityListMutation(goHome);
  const handleSave = () => {
    makeBusy();
    saveTaskActivityList(taskActivityList!);
  };

  ///////////////////////////// Approve
  const { mutate: acceptTaskWeek } = useAcceptTaskWeekMutation(goHome);

  const handleApprove = () => {
    makeBusy();
    acceptTaskWeek(taskWeek!);
  };

  return (
    <main>
      <DateRange selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      {taskActivityList && (
        <TaskGroupList
          taskActivityList={taskActivityList!}
          onStatusChange={handleStatusChange}
          canEdit={isOpen}
        />
      )}
      <TaskButtonTray
        isOpen={isOpen}
        onSave={handleSave}
        onApprove={handleApprove}
        onCancel={goHome}
        taskWeekValue={taskWeek?.value!}
      />
    </main>
  );
};
