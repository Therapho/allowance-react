import { Stack } from "@fluentui/react"
import { useChildAccountSet } from "../common/stores/account/queries/useChildAccountSet";
import { useState } from "react";
import dateUtilities from "../common/utilities/dateUtilities";
import TaskActivityView from "../taskActivity/components/taskActivityView/taskActivityView";
import { parentDashBoardStyles } from "../home/components/parentDashboard/parentDashboard.styles";
import { useTaskContext } from "../taskActivity/context/tasksContext";
import BalanceCard from "../home/components/BalanceCard/balanceCard";
import { useFundSet } from "../common/stores/fund/queries/useFundSet";
import BalanceView from "./balanceView";

export const DashboardView = () =>{
    const { data: childSet } = useChildAccountSet();
    const [selectedDate] = useState(dateUtilities.getMonday(new Date()));
    const {setCanEdit} = useTaskContext();

    setCanEdit(false);
    
    
    return(
        <Stack horizontalAlign="space-around" horizontal wrap styles={parentDashBoardStyles.columnStackStyles} >
        {childSet &&
          childSet.map((childAccount) => (
            <Stack>
              <h3>{childAccount.name}</h3>
              <TaskActivityView selectedDate={selectedDate} accountId={childAccount.id} />
              <BalanceView account={childAccount}/>
            </Stack>
          ))}
          
      </Stack>
    )
}

export default DashboardView