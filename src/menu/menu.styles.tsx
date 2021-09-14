import { mergeStyleSets } from "@fluentui/merge-styles";

export const getClassNames = () => {
  return mergeStyleSets({

      root: {
        width: 208,
        height: "100%",
        boxSizing: "border-box",
        border: "1px solid #eee",
        overflowY: "auto",
      }
    },
  );
};
