import { Stack } from "@fluentui/react";
import { Account } from "../../../common/stores/account/types/accountType";
import { useFundSet } from "../../../common/stores/fund/queries/useFundSet";
import BalanceCard from "../BalanceCard/balanceCard";
import TaskCard from "../TaskCard/taskCard";
import TransactionCard from "../TransactionCard/transactionCard";
import { dashBoardStyles } from "./dashboard.styles";

type dashboardProps = {
    account: Account;
}
export const Dashboard = ({account}:dashboardProps) => {
  const { data: fundSet } = useFundSet(account.id);

  return (

      
        <Stack
          horizontalAlign="center"
          wrap
          horizontal
          tokens={dashBoardStyles.stackTokens}
          styles={dashBoardStyles.stackStyles}
        >
          
          {fundSet && (<BalanceCard fundSet={fundSet} account={account}/>)}
          <TaskCard account={account} />
          <TransactionCard account={account} />
        </Stack>
      

  );
};
