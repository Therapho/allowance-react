import { IStackStyles, IStackTokens } from "@fluentui/react";

export const dashBoardStyles = {
  stackTokens: <IStackTokens>{
    childrenGap: 55,
  },
  stackStyles: <IStackStyles>{
    root: {
        margin: 100,
        "@media only screen and (max-width: 768px)":{
            margin:10
        }
      
    },
  },
};
