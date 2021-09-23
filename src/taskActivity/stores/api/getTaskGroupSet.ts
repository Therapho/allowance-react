import axios from "axios";
import { LookupSet } from "../../../common/stores/lookup/types/lookupType";
export const getTaskGroupList = async () => {
    return (await axios.get<LookupSet>("/api/lookups/taskgroupset")).data;
};
