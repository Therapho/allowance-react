import { Label } from "@fluentui/react";
import { profile } from "console";
import Card from "../../../common/components/card/card";
import { useAccount } from "../../../common/stores/account/queries/useAccount";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../../../common/stores/profile/types/profileType";

const AccountCard = () => {
  const { data: account } = useAccount();
  const { data: profile } = useProfile();

  return (
    <Card>
      <Label>Account</Label>
      <p>{account?.name}</p>
      <p>{checkIfParent(profile) ? "Parent" : "Child"}</p>
    </Card>
  );
};

export default AccountCard;
