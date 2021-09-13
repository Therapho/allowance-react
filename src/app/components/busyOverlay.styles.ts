import { mergeStyleSets } from "@fluentui/merge-styles";


export const getClassNames = () => {
  return mergeStyleSets({
    root: {
      position: "fixed",
      bottom: 0,
    },
  });
};
