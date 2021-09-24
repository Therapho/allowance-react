import { Stack } from "@fluentui/react";
import AccountCard from "../AccountCard/accountCard";
import BalanceCard from "../BalanceCard/balanceCard";
import TaskCard from "../TaskCard/taskCard";
import TransactionCard from "../TransactionCard/transactionCard";
import { childDashBoardStyles } from "./childDashboard.styles";

export const ChildDashboard = () => {
  return (
    <section>
      <Stack
        horizontalAlign="center"
        wrap
        horizontal
        tokens={childDashBoardStyles.stackTokens}
        styles={childDashBoardStyles.stackStyles}
      >
        <AccountCard />
        {/* <BalanceCard /> */}
        {/* <TaskCard />
        <TransactionCard /> */}
      </Stack>
    </section>
  );
};
