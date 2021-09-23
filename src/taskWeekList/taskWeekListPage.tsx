import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useAccount } from "../common/stores/account/queries/useAccount";
import { useTaskWeekSet } from "../common/stores/task/queries/useTaskWeekSet";
import { TaskWeek } from "../common/stores/task/types/taskWeekType";
import { Constants } from "../common/utilities/constants";
import dateUtilities from "../common/utilities/dateUtilities";
import TaskWeekList from "./components/taskWeekList";

const TaskWeekListPage = ()=>{
    
    const [selectedDate, setSelectedDate] = useState(
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