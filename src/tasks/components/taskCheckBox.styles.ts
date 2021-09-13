import { mergeStyleSets } from "@fluentui/merge-styles";
import { DefaultPalette } from "@fluentui/style-utilities";
    
const checkBoxSize = "2vw";
export const getClassNames = () => {
  return mergeStyleSets({
    checkBox: {
      textAlign: "center",
      verticalAlign: "middle",
      width: checkBoxSize,
      height: checkBoxSize,
      border: "gray thin solid",
      margin: 1,
      padding: 3,
    },
    accepted: {
      fontSize: checkBoxSize,
      color: DefaultPalette.green,
    },
    blocked: {
      fontSize: checkBoxSize,
      color: DefaultPalette.red,
    },
    clear: {
      fontSize: checkBoxSize,
      color: DefaultPalette.neutralLight,
    },
  });
};
