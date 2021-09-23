import { Stack } from "@fluentui/react";
import { Fragment } from "react";
import AccountCard from "../AccountCard/accountCard";
import BalanceCard from "../BalanceCard/balanceCard";
import TaskCard from "../TaskCard/taskCard";
import TransactionCard from "../TransactionCard/transactionCard";
import { dashBoardStyles } from "./dashboard.styles";

export const Dashboard = () => {
  return (
    <section>
      <Stack
        horizontalAlign="center"
        wrap
        horizontal
        tokens={dashBoardStyles.stackTokens}
        styles={dashBoardStyles.stackStyles}
      >
        <AccountCard />
        <BalanceCard />
        <TaskCard />
        <TransactionCard />
      </Stack>
    </section>
  );
};
