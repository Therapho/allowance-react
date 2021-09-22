import { mergeStyleSets } from "@fluentui/merge-styles";
import { IStackStyles } from "@fluentui/react";
import { DefaultPalette } from "@fluentui/style-utilities";

const stackStyles: IStackStyles = {
  root: {
    backgroundColor: DefaultPalette.themeDark,
    height: 32,
    color: DefaultPalette.themeLighterAlt,
  },
};

const headerStyles = mergeStyleSets({
  headerText: {
    color: DefaultPalette.themeLighterAlt,
  },
  headerIcon: {
    color: DefaultPalette.themeLighterAlt,
    padding: 10,
  },
  icon: {
    color: DefaultPalette.themeLighterAlt,
  },
});
const stackItemStyles = mergeStyleSets({
  root:{
    width:"30%"
  }
})
const messageBarStyles =  mergeStyleSets({
  root: {
    width: "30%",
  },
});

export default {stackStyles, headerStyles, messageBarStyles, stackItemStyles}