import { Stack } from "@fluentui/react";
import { useAccount } from "../../../common/stores/account/queries/useAccount";
import AccountCard from "../AccountCard/accountCard";
import BalanceCard from "../BalanceCard/balanceCard";
import TaskCard from "../TaskCard/taskCard";
import TransactionCard from "../TransactionCard/transactionCard";
import { childDashBoardStyles } from "./childDashboard.styles";

export const ChildDashboard = () => {
  const { data: account } = useAccount();
  return (
    <section>
      {account && (
        <Stack
          horizontalAlign="center"
          wrap
          horizontal
          tokens={childDashBoardStyles.stackTokens}
          styles={childDashBoardStyles.stackStyles}
        >
          <AccountCard />
          <BalanceCard account={account} />
          <TaskCard account={account} />
          <TransactionCard account={account} />
        </Stack>
      )}
    </section>
  );
};
