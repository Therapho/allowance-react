import { Stack } from "@fluentui/react";
import { Fragment } from "react";
import { useChildAccountSet } from "../../../common/stores/account/queries/useChildAccountSet";
import { Dashboard } from "../Dashboard/dashboard";
import { parentDashBoardStyles } from "./parentDashboard.styles";

export const ParentDashBoard = () => {
  const { data: childSet } = useChildAccountSet();

  return (
    <Stack horizontalAlign="space-around" wrap styles={parentDashBoardStyles.columnStackStyles}>
      {childSet &&
        childSet.map((childAccount) => (
          <Fragment><h3>{childAccount.name}</h3>
          <Dashboard account={childAccount}/></Fragment>
        ))}
    </Stack>
  );
};
