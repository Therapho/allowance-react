import { mergeStyleSets } from "@fluentui/merge-styles";
import { IStackStyles } from "@fluentui/react";
import { DefaultPalette } from "@fluentui/style-utilities";
import { appIcon } from "../app.styles";

export const stackStyles:IStackStyles = {
 
    root:{
      backgroundColor: DefaultPalette.themeDark,
      height: 32,
      alignItems: "center",
      color: DefaultPalette.themeLighterAlt,
    }     
  
  
}

export const headerStyles = mergeStyleSets({
    
    headerText:{
        color: DefaultPalette.themeLighterAlt
    },
    headerIcon:{
        color:DefaultPalette.themeLighterAlt,
        padding:10
    },
    icon: {
    
      color:DefaultPalette.themeLighterAlt,
    },
    
  });


