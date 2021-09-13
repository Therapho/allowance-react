import { mergeStyleSets } from "@fluentui/merge-styles";
import { appIcon, appPanel } from "../app.styles";

export const getClassNames = () => {
  return mergeStyleSets({
    icon: appIcon,
    panel: appPanel

  });
};
