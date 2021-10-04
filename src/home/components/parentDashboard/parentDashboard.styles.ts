import { IStackStyles, IStackTokens } from "@fluentui/react";


export const parentDashBoardStyles = {
  stackTokens:{
    childrenGap: 10,
  } as IStackTokens,
  columnStackStyles:{
    root:{
      width:"100%"
    }
  }as IStackStyles,
  stackStyles:{
    root: {
        margin: 10,

        width:"48%",
        "@media only screen and (max-width: 768px)":{
            margin:10,
            width:"100%",
        }
      
    },
  } as IStackStyles,
};
