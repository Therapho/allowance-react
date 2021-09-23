import { IStackStyles } from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/merge-styles";

const stackFillStyles = mergeStyleSets<IStackStyles>({
  root: {
    height: "100%",
    width: "100%",
  },
});

export { stackFillStyles };
