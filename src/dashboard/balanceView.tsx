import { Account } from "../common/stores/account/types/accountType";
import { useFundSet } from "../common/stores/fund/queries/useFundSet";
import BalanceCard from "../home/components/BalanceCard/balanceCard";

type balanceViewProps = {account: Account};

const BalanceView = ({account}:balanceViewProps) =>{
    const {data:fundSet} = useFundSet(account.id);

    return(
        <BalanceCard account={account} fundSet={fundSet||[]}/>
    )
}
export default BalanceView;