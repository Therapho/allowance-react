import { IDetailsListStyles } from "@fluentui/react"

export const useTaskWeekListStyles=(width:string|number|unknown)=>{
    return {
        root:{
            width
        }
    } as IDetailsListStyles
}