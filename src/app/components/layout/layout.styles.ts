import { IStackStyles } from "@fluentui/react";
import { mergeStyles, mergeStyleSets } from "@fluentui/merge-styles";

const LayoutStyles = {
  messageBar: mergeStyles({
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 0,
  }),
  stack: mergeStyleSets<IStackStyles>({
    root: {
      height: "100%",
      width: "100%",
    },
  }),
};

export default LayoutStyles;
