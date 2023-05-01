import { PrimaryButton, DefaultButton, Stack } from "@fluentui/react";
import { Fragment } from "react";

import { appButton } from "../../../app/app.styles";
import Tray from "../../../common/components/tray/tray";
import { TaskDefinitionSet } from "../../../common/stores/task/types/taskDefinition";
import { useTaskButtonTrayStyles } from "./useTaskButtonTray.styles";
import { useTaskContext } from "../../context/tasksContext";

type TaskButtonTrayProps = {
  onSave: () => void;
  onApprove: () => void;
  onCancel: () => void;
  canApprove: boolean;
  taskWeekValue: number;
  taskDefinitionSet: TaskDefinitionSet;
};

export const TaskButtonTray = ({
  
  onSave,
  onApprove,
  onCancel,
  canApprove,
  taskWeekValue,
  taskDefinitionSet
}: TaskButtonTrayProps) => {
  const taskButtonTrayStyles = useTaskButtonTrayStyles();
  var totalDailyValue = 0;
  const {canEdit} = useTaskContext();

  for(var taskDefinition of taskDefinitionSet){
    totalDailyValue += taskDefinition.value
  }
  var thisDay = new Date().getDay();
  if(thisDay === 0) thisDay = 7;
  var totalCurrentMaximumValue = totalDailyValue * thisDay;
  var totalWeeklyValue = totalDailyValue * 5;
  var weekStatusStyle = taskButtonTrayStyles.redStatus;
  if(taskWeekValue >= totalCurrentMaximumValue *.75) weekStatusStyle = taskButtonTrayStyles.yellowStatus;
  if(taskWeekValue >= totalWeeklyValue *.75) weekStatusStyle = taskButtonTrayStyles.greenStatus;

  return (
    <Tray>
      <Stack
        horizontal
        horizontalAlign="space-between"
        styles={taskButtonTrayStyles.stackStyles}
      >
        <Stack.Item>
          {canEdit && (
            <Fragment>
              <PrimaryButton onClick={onSave} styles={appButton}>
                Save
              </PrimaryButton>
              {canApprove && (
                <DefaultButton styles={appButton} onClick={onApprove}>
                  Accept
                </DefaultButton>
              )}
            </Fragment>
          )}
          <DefaultButton styles={appButton} onClick={onCancel}>
            Cancel
          </DefaultButton>
        </Stack.Item>
        <Stack.Item align="center" style={weekStatusStyle}>
          Total:{" "}
          {taskWeekValue?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Stack.Item>        
      </Stack>
    </Tray>
  );
};
