import { IStackStyles, IStackTokens } from "@fluentui/react";


export const dashBoardStyles = {
  stackTokens:{
    childrenGap: 10,
    
  } as IStackTokens,
  stackStyles:{
    root: {
        margin: 20,
        "@media only screen and (max-width: 768px)":{
            margin:10
        }
      
    },
  } as IStackStyles,
};
