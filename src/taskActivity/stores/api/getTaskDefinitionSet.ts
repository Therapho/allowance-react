import axios from "axios";
import {  TaskDefinitionSet } from "../types/taskDefinition";

export const getTaskDefinitionSet = async () => {
    return (await axios.get<TaskDefinitionSet>("/api/taskdefinitionset")).data;
};
