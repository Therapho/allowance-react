import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { Fragment } from "react";
import { appButton } from "../../app/app.styles";
import Tray from "../../common/components/tray";
import { TaskButtonTrayProps } from "./taskButtonTrayProps";

export const TaskButtonTray = ({
  isOpen,
  onSave,
  onApprove,
  onCancel,
  taskWeekValue,
}: TaskButtonTrayProps) => {
  return (
    <Tray>
      {isOpen && (
        <Fragment>
          <PrimaryButton onClick={onSave} styles={appButton}>
            Save
          </PrimaryButton>
          <DefaultButton styles={appButton} onClick={onApprove}>
            Accept
          </DefaultButton>
        </Fragment>
      )}
      <DefaultButton styles={appButton} onClick={onCancel}>
        Cancel
      </DefaultButton>
      Total for the week:{" "}
      {taskWeekValue?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </Tray>
  );
};
