
import { mergeStyleSets } from "@fluentui/style-utilities";

export const useTaskButtonTrayStyles = () => {


  return {
    stackItemStyles: mergeStyleSets({
      root: {
        textAlign: "middle",
      },
    }),
    stackStyles: mergeStyleSets({
      root: {
        marginLeft: 15,
        marginRight: 20,
        marginBottom: 5,
      },
    }),
  };
};
