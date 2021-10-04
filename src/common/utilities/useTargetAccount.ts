import { useLocation } from "react-router";
import { useAccount } from "../stores/account/queries/useAccount";
import { Account } from "../stores/account/types/accountType";
import { useProfile } from "../stores/profile/queries/useProfile";
import { checkIfParent } from "../stores/profile/types/profileType";

export const useTargetAccount = ()=>{
    const selectedAccount = useLocation<Account>().state;
    const {data: authenticatedAccount} = useAccount();
    const {data:profile} = useProfile();
    if(!selectedAccount && checkIfParent(profile))
        return undefined;
    return selectedAccount?selectedAccount: authenticatedAccount;
}
export const useTargetAccountId = ()=>{
    const selectedAccountId = useLocation<number>().state;
    const {data: authenticatedAccount} = useAccount();
    const {data:profile} = useProfile();
    if(!selectedAccountId && checkIfParent(profile))
        return undefined;
    return selectedAccountId?selectedAccountId: authenticatedAccount?.id;
}