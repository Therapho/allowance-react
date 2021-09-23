import { mergeStyles, mergeStyleSets } from "@fluentui/merge-styles";
import { DefaultPalette } from "@fluentui/style-utilities";


const headerStyles = {
  headerText: mergeStyles({
    color: DefaultPalette.themeLighterAlt,
    fontSize:16
  }),
  headerIcon: mergeStyles({
    color: DefaultPalette.themeLighterAlt,
    padding: 10,
  }),
  icon: mergeStyles({
    color: DefaultPalette.themeLighterAlt,
  }),
  stackItemStyles: mergeStyleSets({
    root: {
      width: "30%",
    },
  }),
  stackStyles: mergeStyleSets({
    root: {
      backgroundColor: DefaultPalette.themeDark,
      height: 32,
      color: DefaultPalette.themeLighterAlt,
    },
  }),
};
export default headerStyles;