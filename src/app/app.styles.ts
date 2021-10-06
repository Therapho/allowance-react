import {
  FontSizes,
  mergeStyles,
  mergeStyleSets,
} from "@fluentui/react";


export const appElementLeft = mergeStyles({
  float: "left",
  textAlign: "left",
  width: "50%",
});

export const appElementRight = mergeStyles({
  float: "right",
  textAlign: "right",
  width: "50%",
});


export const appIcon = mergeStyles({
  marginLeft: 5,
  marginRight: 5,
});


export const appButton = mergeStyleSets({
  root: {
    margin: 5,
    "@media only screen and (max-width: 768px)": {
      fontSize: FontSizes.size10,
      height: 20,
      width: 40,
    },
  },
});
