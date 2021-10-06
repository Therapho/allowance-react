import { mergeStyleSets } from "@fluentui/merge-styles";
import { useTheme } from "@fluentui/react";
import { FontSizes } from "@fluentui/style-utilities";

const checkBoxSize = FontSizes.size24;
const checkBoxSizeMobile = FontSizes.size12;
export const useTaskCheckboxStyles = () => {
  const theme = useTheme();
  return mergeStyleSets({
    checkBox: {
      textAlign: "center",
      verticalAlign: "middle",
      width: 32,
      height: 32,
      border: "gray thin solid",
      margin: 1,
      padding: 3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "@media only screen and (max-width: 768px)": {
        width: 16,
        height: 16,
        padding: 1,
      },
    },
    accepted: {
      fontSize: checkBoxSize,
      color: theme.palette.green,
      verticalAlign: "center",
      horizontalAlign: "middle",
      "@media only screen and (max-width: 768px)": {
        fontSize: checkBoxSizeMobile,
      },
    },
    blocked: {
      fontSize: checkBoxSize,
      color: theme.palette.red,
      "@media only screen and (max-width: 768px)": {
        fontSize: checkBoxSizeMobile,
      },
    },
    clear: {
      fontSize: checkBoxSize,
      color: theme.palette.neutralLight,
      "@media only screen and (max-width: 768px)": {
        fontSize: checkBoxSizeMobile,
      },
    },
  });
};
