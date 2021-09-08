import axios from "axios";
import { useQuery } from "react-query"
import { Account } from "./accountType";

const getAccountById = async (userId: string|undefined) =>{
    const params = { params: { userid: userId } };
    const {data} = await axios.get<Account[]>("/api/accountset", params);
    return data[0];
}
 export const useAccount=(userId:string|undefined, enabled=true)=>{
    const cacheKey = ['account', {'userid': userId}]
    return useQuery(cacheKey,  ()=>getAccountById(userId), {enabled:!!userId});
        
    }
