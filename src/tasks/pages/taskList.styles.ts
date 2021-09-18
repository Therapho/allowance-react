import { mergeStyleSets } from "@fluentui/merge-styles";
import { FontSizes, FontWeights } from "@fluentui/style-utilities";

export const taskListStyles = mergeStyleSets({
    leftItem:{
        width:"33%"
    },
    centerItem:{
        width:"33%",
        textAlign: "center",
        fontWeight: FontWeights.bold,
        fontSize: FontSizes.medium
    },
    rightItem:{
        width:"33%",
        textAlign: "right"
    },
});