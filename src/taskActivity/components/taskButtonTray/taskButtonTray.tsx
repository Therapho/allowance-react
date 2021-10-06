import { PrimaryButton, DefaultButton, Stack } from "@fluentui/react";
import { Fragment } from "react";

import { appButton } from "../../../app/app.styles";
import Tray from "../../../common/components/tray/tray";
import { useTaskButtonTrayStyles } from "./taskButtonTray.styles";

type TaskButtonTrayProps = {
  canEdit: boolean;
  onSave: () => void;
  onApprove: () => void;
  onCancel: () => void;
  canApprove: boolean;
  taskWeekValue: number;
};

export const TaskButtonTray = ({
  canEdit,
  onSave,
  onApprove,
  onCancel,
  canApprove,
  taskWeekValue,
}: TaskButtonTrayProps) => {
  const taskButtonTrayStyles = useTaskButtonTrayStyles();
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
        <Stack.Item align="center">
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
