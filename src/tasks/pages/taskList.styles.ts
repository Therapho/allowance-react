import { mergeStyleSets } from "@fluentui/merge-styles";
import { appElementLeft, appElementRight } from "../../app/app.styles";

export const taskListStyles = mergeStyleSets({
    left: appElementLeft,
    right: appElementRight
});