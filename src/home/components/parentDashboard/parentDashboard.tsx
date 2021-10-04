import { Stack } from "@fluentui/react";
import { useChildAccountSet } from "../../../common/stores/account/queries/useChildAccountSet";
import BalanceCard from "../BalanceCard/balanceCard";
import TaskCard from "../TaskCard/taskCard";
import TransactionCard from "../TransactionCard/transactionCard";
import { parentDashBoardStyles } from "./parentDashboard.styles";

export const ParentDashBoard = () => {
  const { data: childSet } = useChildAccountSet();

  return (
    <Stack horizontal horizontalAlign="space-around" wrap styles={parentDashBoardStyles.columnStackStyles}>
      {childSet &&
        childSet.map((childAccount) => (
          <Stack
            wrap
            horizontal
            tokens={parentDashBoardStyles.stackTokens}
            styles={parentDashBoardStyles.stackStyles}
          >
            <h2>{childAccount.name}</h2>
            <BalanceCard account={childAccount} />
            <TaskCard account={childAccount} />
            <TransactionCard account={childAccount} />
          </Stack>
        ))}
    </Stack>
  );
};
