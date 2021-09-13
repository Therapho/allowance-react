import { IStackStyles, Overlay, ProgressIndicator } from "@fluentui/react";
import { Fragment } from "react";

const BusyOverlay = ({ busy }: { busy: boolean }) => {
  
  const overlayStyles: IStackStyles = {
    root: {
      position:"fixed"
    },
  };
  return (
    <Fragment>
      {busy && (
        <Overlay  styles={overlayStyles}>
          <ProgressIndicator />
        </Overlay>
      )}
    </Fragment>
  );
};

export default BusyOverlay;
