import { mergeStyles } from "@fluentui/merge-styles";
import { useTheme } from "@fluentui/react";

export const useDateRangeStyles = () => {
  const theme = useTheme();
  return {
    arrowButton: mergeStyles({
      textAlign: "center",
      height: 12,
      padding: 0,
      paddingTop: 6,
      color: theme.palette.themePrimary,
    }),
    arrowIcon: mergeStyles({
      fontSize: 12,
    }),
  };
};
