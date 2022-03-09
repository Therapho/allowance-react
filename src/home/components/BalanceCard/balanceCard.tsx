import { Label, Shimmer } from "@fluentui/react"
import Card from "../../../common/components/card/card"
import { Account } from "../../../common/stores/account/types/accountType";
import { FundSet } from "../../../common/stores/fund/types/fund";
import { useTaskWeek } from "../../../common/stores/task/queries";
import dateUtilities from "../../../common/utilities/dateUtilities";
import { formatCurrency } from "../../../common/utilities/formatCurrency";

type balanceCardProps = {fundSet:FundSet, account: Account};

const BalanceCard = ({fundSet, account}:balanceCardProps) =>{

    const thisWeek = dateUtilities.getMonday(new Date());
    const { data: taskWeek } = useTaskWeek(thisWeek, account.id);

    return(
      <Card >
        <Label>Balance</Label>
        <Shimmer isDataLoaded={!!account}>
          {fundSet.map((fund)=>(
            <p>{fund.name}: {formatCurrency(fund.balance)}</p>
          ))}
       
          </Shimmer>
          <Shimmer isDataLoaded={!!taskWeek}>
        <p>Pending: {formatCurrency(taskWeek?.value)}</p>
          </Shimmer>
      </Card>
    )
}

export default BalanceCard;