
import { useTheme } from "@fluentui/react";
import {  mergeStyleSets } from "@fluentui/style-utilities";


export const useTaskButtonTrayStyles = () => {

  const theme = useTheme();
  return {
    redStatus: mergeStyleSets({color:theme.palette.red}),
    yellowStatus: mergeStyleSets({color:theme.palette.yellow}),
    greenStatus: mergeStyleSets({color:theme.palette.green}),

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
