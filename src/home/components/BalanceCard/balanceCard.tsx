import { Label, Shimmer } from "@fluentui/react"
import Card from "../../../common/components/card/card"
import { Account } from "../../../common/stores/account/types/accountType";
import { useTaskWeek } from "../../../common/stores/task/queries";
import dateUtilities from "../../../common/utilities/dateUtilities";

type balanceCardProps = {account:Account};

const BalanceCard = ({account}:balanceCardProps) =>{

    const thisWeek = dateUtilities.getMonday(new Date());
    const { data: taskWeek } = useTaskWeek(thisWeek, account.id);

    return(
      <Card width="100%">
        <Label>Balance</Label>
        <Shimmer isDataLoaded={!!account}>
        <p>Current: {account?.balance?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}</p>
          </Shimmer>
          <Shimmer isDataLoaded={!!taskWeek}>
        <p>Pending: {taskWeek?.value?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}</p>
          </Shimmer>
      </Card>
    )
}

export default BalanceCard;