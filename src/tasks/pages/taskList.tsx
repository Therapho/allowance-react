import {
  addDays,
  DefaultButton,
  IconButton,
  PrimaryButton,
  Stack,
  StackItem,
} from "@fluentui/react";
import { Fragment, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { appButton } from "../../app/app.styles";
import { useAppState } from "../../app/providers/appStateProvider";
import Tray from "../../common/components/tray";
import { Constants } from "../../common/types/constants";
import dateUtilities from "../../common/utilities/dateUtilities";
import { Task } from "../components/taskCheckbox.props";
import TaskGroupList from "../components/taskGroupList";
import { useAcceptTaskWeekMutation } from "../services/queries/useAcceptTaskWeekMutation";
import {
  useTaskActivityList,
  useTaskActivityListKey,
} from "../services/queries/useTaskActivityList";
import { useTaskActivityListMutation } from "../services/queries/useTaskActivityListMutation";
import { useTaskWeek } from "../services/queries/useTaskWeek";
import { TaskWeek } from "../services/types/taskWeekType";
import { processStatusChange } from "../utilities/processStatusChange";
import { taskListStyles } from "./taskList.styles";

export const TaskPage = () => {
  const { setBusy } = useAppState();
  const history = useHistory();

  // initialize date range
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    dateUtilities.getMonday(today)
  );
  const { data: taskWeek } = useTaskWeek(selectedDate);
  const taskWeekId = taskWeek?.id!;
  const { data: taskActivityList } = useTaskActivityList(
    selectedDate,
    taskWeekId,
    taskWeekId > 0
  );

  // Update data state
  const queryClient = useQueryClient();
  const taskActivityListKey = useTaskActivityListKey(selectedDate);
  const handleStatusChange = (task: Task) => {
    processStatusChange(
      taskActivityList!,
      task,
      queryClient,
      taskActivityListKey
    );
  };

  // Save Data
  const { mutate, status: saveListStatus } = useTaskActivityListMutation();
  const handleSave = () => {
    setBusy(true);
    mutate(taskActivityList!);
    history.push("/home");
  };
  useEffect(() => {
    if (saveListStatus === "success") {
      setBusy(false);
      history.push("/home");
    }
  }, [saveListStatus, setBusy, history]);

  const handlePreviousWeek = () => {
    setSelectedDate(addDays(selectedDate, -7));
  };
  const handleNextWeek = () => {
    setSelectedDate(addDays(selectedDate, 7));
  };
  const handleCancel = () => {
    history.push("/home");
  };

  const { mutate: acceptTaskWeek, status: acceptTaskWeekStatus } =
    useAcceptTaskWeekMutation();

  const handleApprove = () => {
    setBusy(true);
    const newTaskWeek: TaskWeek = {
      ...taskWeek!,
      statusId: Constants.Status.Approved,
    };
    acceptTaskWeek(newTaskWeek);
  };
  useEffect(() => {
    if (acceptTaskWeekStatus === "success") {
      setBusy(false);
      history.push("/home");
    }
  }, [acceptTaskWeekStatus, setBusy, history]);

  const isOpen = taskWeek?.statusId === Constants.Status.Open;
  return (
    <main>
      <Stack horizontal horizontalAlign="space-evenly">
        <StackItem className={taskListStyles.leftItem}>
          <IconButton
            iconProps={{ iconName: "ChevronLeftSmall" }}
            onClick={handlePreviousWeek}
          />
        </StackItem>
        <StackItem className={taskListStyles.centerItem}>
          Tasks for {selectedDate.toLocaleDateString()}
        </StackItem>
        <StackItem className={taskListStyles.rightItem}>
          {addDays(selectedDate, 7) < today && (
            <IconButton
              iconProps={{ iconName: "ChevronRightSmall" }}
              onClick={handleNextWeek}
            />
          )}
        </StackItem>
      </Stack>
      {taskActivityList && (
        <TaskGroupList
          taskActivityList={taskActivityList!}
          onStatusChange={handleStatusChange}
          canEdit={isOpen}
        />
      )}
      <Tray>
        {isOpen && (
          <Fragment>
            <PrimaryButton onClick={handleSave} styles={appButton}>
              Save
            </PrimaryButton>
            <DefaultButton styles={appButton} onClick={handleApprove}>
              Accept
            </DefaultButton>
          </Fragment>
        )}

        <DefaultButton styles={appButton} onClick={handleCancel}>
          Cancel
        </DefaultButton>
      </Tray>
    </main>
  );
};
