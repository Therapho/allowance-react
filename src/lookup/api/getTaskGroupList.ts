import axios from "axios";
import {  LookupList } from "../types/lookupType";

export const getTaskGroupList = async () => {
    return (await axios.get<LookupList>("/api/lookups/taskgroupset")).data;
};
