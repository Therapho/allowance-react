import { QueryKey, useQuery } from "react-query"
import { getLookup } from "../api/getLookup";
import { LookupSet } from "../types/lookupType";

export const useLookup = (lookupName: string)=>{
    const queryKey:QueryKey = lookupName;
    return useQuery<LookupSet>(queryKey, ()=>getLookup(lookupName), { cacheTime:Infinity, staleTime:Infinity});
}