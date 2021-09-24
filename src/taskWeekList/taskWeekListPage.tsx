import { useState } from "react";
import { useAccount } from "../common/stores/account/queries/useAccount";
import dateUtilities from "../common/utilities/dateUtilities";
import TaskWeekList from "./components/taskWeekList";

const TaskWeekListPage = ()=>{
    
    const [selectedDate] = useState(
        dateUtilities.getMonday(new Date())
      );
    const startDate = dateUtilities.addDays(selectedDate, -56 );
    const endDate = dateUtilities.addDays(selectedDate, 7 );

    const {data: account} = useAccount();
    return(
        <main>
            <h1>Task Weeks</h1>
            {account && <TaskWeekList startDate={startDate} endDate={endDate} accountId={account!.id}/>}
        </main>
    )
}
export default TaskWeekListPage;