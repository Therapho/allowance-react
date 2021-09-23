import { mergeStyleSets } from "@fluentui/merge-styles";
import { Depths } from "@fluentui/theme";

export const cardStyles = mergeStyleSets({
  card: {
    boxShadow: Depths.depth16,
    padding: 10,
    margin: 10,
    minWidth: 200,
    height: 100,
  },
});
