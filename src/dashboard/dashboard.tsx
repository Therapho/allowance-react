import { Label, Stack, Text } from "@fluentui/react";
import Card from "../common/components/card";
import { useAccount } from "../common/services/account/queries/useAccount";

export const Dashboard = () => {
  const { data: account } = useAccount();

  return (
    <Stack horizontalAlign="center" wrap horizontal>
      <Card>
        <Label>Name</Label>
        <Text>{account?.name}</Text>
      </Card>
      <Card>
        <Label>Balance</Label>
        <Text>{account?.balance}</Text>
      </Card>
    </Stack>
  );
};
