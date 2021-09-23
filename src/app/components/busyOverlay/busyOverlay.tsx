import { Overlay, ProgressIndicator } from "@fluentui/react";
import { Fragment } from "react";
import { busyOverlayStyles } from "./busyOverlay.styles";

const BusyOverlay = ({ busy }: { busy: boolean }) => {
  return (
    <Fragment>
      {busy && (
        <Overlay styles={busyOverlayStyles}>
          <ProgressIndicator />
        </Overlay>
      )}
    </Fragment>
  );
};

export default BusyOverlay;
