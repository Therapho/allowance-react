import { IStackStyles, IStackTokens } from "@fluentui/react";


export const childDashBoardStyles = {
  stackTokens:{
    childrenGap: 55,
  } as IStackTokens,
  stackStyles:{
    root: {
        margin: 100,
        "@media only screen and (max-width: 768px)":{
            margin:10
        }
      
    },
  } as IStackStyles,
};
