import { Fragment } from "react";
import { useAccount } from "../../../common/stores/account/queries/useAccount";
import FundsList from "../fundsList/fundsList";

const FundsChildView = () =>{
    const { data: authenticatedAccount } = useAccount();
    return(
        <Fragment>
            {authenticatedAccount && ( <FundsList selectedAccount={authenticatedAccount}/>)}
        </Fragment>
       
    )
}

export default FundsChildView;