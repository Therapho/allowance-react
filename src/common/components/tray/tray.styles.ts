import { mergeStyleSets } from "@fluentui/merge-styles";
import { useTheme } from "@fluentui/react";
import { Depths } from "@fluentui/theme";

export const useTrayStyles = () =>{
  const theme = useTheme();
  return mergeStyleSets({
    tray: {
      boxShadow: Depths.depth16,
  
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: 0,
      backgroundColor: theme.palette.neutralLighterAlt,
      "@media only screen and (max-width: 768px)": {
        height: 25,
        paddingBottom:5
      },
    },
    shelf: {
      height: 50,
      "@media only screen and (max-width: 768px)": {
        height: 25,
      },
    },
  })
}