import { mergeStyleSets } from "@fluentui/merge-styles";
import { Depths } from "@fluentui/theme";

export const taskGroupListStyles = mergeStyleSets({
  groupBox: {
    boxShadow: Depths.depth16,
    padding: 10,
    margin: 5,
  },
});
