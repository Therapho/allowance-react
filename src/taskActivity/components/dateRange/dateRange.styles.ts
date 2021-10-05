import { mergeStyles } from "@fluentui/merge-styles";
import {
  DefaultPalette,
} from "@fluentui/style-utilities";

export const dateRangeStyles = {
  arrowButton: mergeStyles({
    textAlign: "center",
    height: 12,
    padding:0,
    paddingTop:6,
    color: DefaultPalette.black,
  }),
  arrowIcon: mergeStyles({
     
      fontSize:12})
};
