import { mergeStyleSets } from "@fluentui/merge-styles";
import { DefaultPalette } from "@fluentui/style-utilities";

export const getClassNames = () => {
  return mergeStyleSets({
    header: {
      backgroundColor: DefaultPalette.themeDark,
      height: 32,
      alignItems: "center",
      color: DefaultPalette.themeLighterAlt,
    },
    
    headerText:{
        color: DefaultPalette.themeLighterAlt
    },
    headerIcon:{
        color:DefaultPalette.themeLighterAlt,
        padding:10
    }

  });
};

