import { Overlay, ProgressIndicator } from "@fluentui/react";
import { Fragment } from "react";
import { getClassNames } from "./busyOverlay.styles";

const BusyOverlay = ({ busy }: { busy: boolean }) => {
  
  const classNames = getClassNames();

  return (
    <Fragment>
      {busy && (
        <Overlay  styles={classNames}>
          <ProgressIndicator />
        </Overlay>
      )}
    </Fragment>
  );
};

export default BusyOverlay;
