import { useEffect } from "react";
import TaskService from "../../services/taskService";

export const TaskWeeks = ()=>{

    const startDate = DateUtilities.addDays(this.selectedDate, -30 );
    const endDate = DateUtilities.addDays(this.selectedDate, 7 );
    
    useEffect(()=>{
        TaskService.getTaskWeeks()
    },[]);

    
    return(
        <div></div>
    );
}