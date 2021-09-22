import { QueryKey, useQuery } from "react-query"
import { getLookup } from "../api/getLookup";
import { LookupList } from "../types/lookupType";

export const useLookup = (lookupName: string)=>{
    const queryKey:QueryKey = lookupName;
    return useQuery<LookupList>(queryKey, ()=>getLookup(lookupName), { cacheTime:Infinity, staleTime:Infinity});
}