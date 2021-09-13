import axios from "axios";
import { LookupList } from "../../../common/services/lookup/types/lookupType";
export const getTaskGroupList = async () => {
    return (await axios.get<LookupList>("/api/lookups/taskgroupset")).data;
};
