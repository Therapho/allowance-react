import { useChildAccountSet } from "../common/stores/account/queries/useChildAccountSet";
import { useTargetAccount } from "../common/utilities/useTargetAccount";
import TransactionList from "./components/transactionList";

const TransactionPage = ()=>{
    const account = useTargetAccount();
    const {data:childAccountSet} = useChildAccountSet();
    return(
        <main>
            <h1>Transactions</h1>
            {childAccountSet&&<TransactionList account={account} childAccountSet={childAccountSet}/>}
        </main>
    )
}

export default TransactionPage;