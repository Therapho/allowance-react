import axios from "axios";
import { useQuery } from "react-query"
import { useProfile } from "../../profile/queries/useProfile";
import { Account } from "../types/accountType";

const getAccountById = async (userId: string|undefined) =>{
    const params = { params: { userid: userId } };
    const {data} = await axios.get<Account[]>("/api/accountset", params);
    return data[0];
}
 export const useAccount=()=>{
     const {data:profile} = useProfile();
     const userId = profile?.userId;
    const cacheKey = ['account', {'userid': userId}]
    return useQuery(cacheKey,  ()=>getAccountById(userId), {enabled:!!userId, staleTime:Infinity, cacheTime: Infinity});
        
    }
