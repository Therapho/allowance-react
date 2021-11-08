import { mergeStyles, useTheme } from "@fluentui/react"

export const useFundsListStyles = ()=>{
    const theme = useTheme();
    return({
        validAllocation:mergeStyles({
            color: theme.palette.green
        }),
        invalidAllocation: mergeStyles({
            color:theme.palette.red
        }),
        incompleteAllocation: mergeStyles({
            color:theme.palette.yellow
        })

    })
   
}