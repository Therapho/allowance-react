import { Stack } from "@fluentui/react";
import { useChildAccountSet } from "../../../common/stores/account/queries/useChildAccountSet";
import BalanceCard from "../BalanceCard/balanceCard";
import TaskCard from "../TaskCard/taskCard";
import TransactionCard from "../TransactionCard/transactionCard";
import { parentDashBoardStyles } from "./parentDashboard.styles";

export const ParentDashBoard = () => {
  const {data:childSet} = useChildAccountSet();


  return (
    <Stack horizontal>
      {childSet&&(
        childSet.map((childAccount)=>(
          <div>
          <h2>{childAccount.name}</h2>
        
      <Stack
        horizontalAlign="center"
        wrap
        horizontal
        tokens={parentDashBoardStyles.stackTokens}
        styles={parentDashBoardStyles.stackStyles}
      >
        
    
        <BalanceCard account={childAccount} />
        <TaskCard account={childAccount}/>
        <TransactionCard account={childAccount} />
      </Stack>
      </div>
        )))}
    </Stack>
  );
};
