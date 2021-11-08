import { PrimaryButton } from "@fluentui/react";
import { Fragment, useState } from "react";
import ConfirmDialog from "../confirmDialog/confirmDialog";

type ConfirmButtonProps = {
  text: string;
  dialogTitle: string;
  dialogMessage: string;
  onConfirm: () => void;
};
const ConfirmButton = ({
  text,
  dialogTitle,
  dialogMessage,
  onConfirm: handleConfirm,
}: ConfirmButtonProps) => {
  const [showDialog, setShowDialog] = useState(true);

  const handleClose = (confirmed: boolean) => {
    setShowDialog(false);
    handleClose(confirmed);
  };
  return (
    <Fragment>
      <PrimaryButton text={text} onClick={() => setShowDialog(true)} />
      <ConfirmDialog
        title={dialogTitle}
        message={dialogMessage}
        onClose={handleClose}
        showDialog={showDialog}
      />
    </Fragment>
  );
};

export default ConfirmButton;
