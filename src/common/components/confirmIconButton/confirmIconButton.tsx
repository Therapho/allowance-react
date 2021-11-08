import { IconButton, PrimaryButton } from "@fluentui/react";
import { Fragment, useState } from "react";
import ConfirmDialog from "../confirmDialog/confirmDialog";

type ConfirmIconButtonProps = {
    icon: string;
  dialogTitle: string;
  dialogMessage: string;
  onConfirm: () => void;
};
const ConfirmIconButton = ({
  icon,
  dialogTitle,
  dialogMessage,
  onConfirm: handleConfirm,
}: ConfirmIconButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleClose = (confirmed: boolean) => {
    setShowDialog(false);
    if(confirmed) handleConfirm();
  };
  return (
    <Fragment>
      <IconButton iconProps={{iconName:icon}} onClick={() => setShowDialog(true)} />
      <ConfirmDialog
        title={dialogTitle}
        message={dialogMessage}
        onClose={handleClose}
        showDialog={showDialog}
      />
    </Fragment>
  );
};

export default ConfirmIconButton;
