import { useState } from "react";
import { useLocation } from "react-router";
import { useAccount } from "../common/stores/account/queries/useAccount";
import { Account } from "../common/stores/account/types/accountType";
import dateUtilities from "../common/utilities/dateUtilities";
import { useTargetAccount } from "../common/utilities/useTargetAccount";
import TaskWeekList from "./components/taskWeekList";

const TaskWeekListPage = ()=>{
    
    const [selectedDate] = useState(
        dateUtilities.getMonday(new Date())
      );
    const startDate = dateUtilities.addDays(selectedDate, -56 );
    const endDate = dateUtilities.addDays(selectedDate, 7 );
    
    const account = useTargetAccount();

    return(
        <main>
            <h1>Task Weeks</h1>
            {account && <TaskWeekList startDate={startDate} endDate={endDate} accountId={account!.id}/>}
        </main>
    )
}
export default TaskWeekListPage;