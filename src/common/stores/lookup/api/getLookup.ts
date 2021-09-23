import axios from "axios";
import { LookupSet } from "../types/lookupType";
export const getLookup = async (lookupName: string) => {
    return (await axios.get<LookupSet>("/api/lookups/" + lookupName)).data;
};
