import axios from "axios";
import { lookup } from "dns";
import { LookupList } from "../types/lookupType";
export const getLookup = async (lookupName: string) => {
    return (await axios.get<LookupList>("/api/lookups/" + lookupName)).data;
};
