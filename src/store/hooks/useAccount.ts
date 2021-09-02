import { useAppSelector } from "../hooks";

export const useAccount = ()=>{
    const accountSelector = useAppSelector((state)=>state.account);
    const account = accountSelector.data;
    return account;
}