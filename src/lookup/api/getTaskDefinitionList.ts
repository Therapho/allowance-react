import axios from "axios";
import { TaskDefinition } from "../types/taskDefinitionType";

export const getTaskDefinitionList = async () => {
    return (await axios.get<TaskDefinition[]>("/api/taskdefinitionset")).data;
};
