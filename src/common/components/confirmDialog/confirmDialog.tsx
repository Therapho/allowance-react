import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from "@fluentui/react";

type ConfirmDialogProps ={
    title:string,
    message: string,
    onClose:(confirmed:boolean) => void,
    showDialog: boolean
}
const ConfirmDialog = ({title, message, showDialog, onClose} : ConfirmDialogProps) => {
  
  const dialogContentProps = {
    type: DialogType.normal,
    title: title,
    closeButtonAriaLabel: "Close",
    subText: message,
  };

  const handleClose=(confirmed: boolean) => {
      onClose(confirmed);

  }
  return (
    <Dialog
      hidden={!showDialog}
      onDismiss={()=>handleClose(false)}
      dialogContentProps={dialogContentProps}
      modalProps={{
        isBlocking: true,
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={()=>handleClose(true)} text="Yes" />
        <DefaultButton onClick={()=>handleClose(false)} text="No" />
      </DialogFooter>
    </Dialog>
  );
};
export default ConfirmDialog;