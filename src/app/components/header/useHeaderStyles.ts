import { mergeStyles, mergeStyleSets } from "@fluentui/merge-styles";
import { useTheme } from "@fluentui/react";

const useHeaderStyles = (()=>{
  const theme = useTheme();
  return ({
  headerText: mergeStyles({
    color: theme.palette.themeLighterAlt,
    fontSize: 16,
  }),
  headerIcon: mergeStyles({
    color: theme.palette.themeLighterAlt,
    padding: 10,
  }),
  icon: mergeStyles({
    color: theme.palette.themeLighterAlt,
  }),
  stackItemStyles: mergeStyleSets({
    root: {
      width: "30%",
    },
  }),
  stackStyles: mergeStyleSets({
    root: {
      backgroundColor: theme.palette.themePrimary,
      height: 32,
      color: theme.palette.themeLighterAlt,
    },
  }),
})})

export default useHeaderStyles;
