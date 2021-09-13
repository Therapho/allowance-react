import { mergeStyleSets } from "@fluentui/merge-styles";
import { Depths } from "@fluentui/theme";

export const trayStyles = mergeStyleSets({
  tray: {
    boxShadow: Depths.depth16,
    padding: 10,
    margin: 10,
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});
