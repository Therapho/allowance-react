import { Label, Stack, Text } from "@fluentui/react";
import Card from "../../common/components/card";
import { useAccount } from "../../common/stores/account/queries/useAccount";
import { dashboardStackTokens } from "./dashboard.styles";

export const Dashboard = () => {
  const { data: account } = useAccount();

  return (
    <Stack horizontalAlign="center" wrap horizontal tokens={dashboardStackTokens}>
      <Card>
        <Label>Name</Label>
        <Text>{account?.name}</Text>
        <Text>{account?.roleId}</Text>
      </Card>
      <Card>
        <Label>Balance</Label>
        <Text>{account?.balance}</Text>
      </Card>
    </Stack>
  );
};
