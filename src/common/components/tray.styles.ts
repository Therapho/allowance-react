import { mergeStyleSets } from "@fluentui/merge-styles";
import { DefaultPalette, Depths } from "@fluentui/theme";

export const trayStyles = mergeStyleSets({
  tray: {
    boxShadow: Depths.depth16,

    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 0,
    backgroundColor: DefaultPalette.neutralLighterAlt,
    "@media only screen and (max-width: 768px)": {
      height: 25,
    },
  },
  shelf: {
    height: 50,
    "@media only screen and (max-width: 768px)": {
      height: 25,
    },
  },
});
