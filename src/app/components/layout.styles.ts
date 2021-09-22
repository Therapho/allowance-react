import {
  IMessageBarStyles,
  IStackItemStyles,
  IStackStyles,
} from "@fluentui/react";
import { mergeStyles, mergeStyleSets } from "@fluentui/merge-styles";

const stackFillStyles = mergeStyleSets<IStackStyles>({
  root: {
    height: "100%",
    width: "100%",
  },
});


export default {stackFillStyles};