import { createContext, useContext, useEffect, useState } from "react";
import { LookupListData } from "./types/lookupType";
import { TaskDefinitionListData } from "./types/taskDefinitionType";
import { useTaskDefinitionList } from "./queries/useTaskDefinitionList";
import { useTaskGroupList } from "./queries/useTaskGroupList";

export type LookupType = {
  taskGroupList: LookupListData;
  taskDefinitionList: TaskDefinitionListData;
};

const LookupData = createContext<LookupType>(undefined!);

export default LookupData;

export function LookupProvider({ children }: { children: React.ReactNode }) {
  const [taskGroupList, setTaskGroupList] = useState<LookupListData>(undefined);

  const { data: taskGroupListData } = useTaskGroupList();
  useEffect(() => {
    if (taskGroupListData) setTaskGroupList(taskGroupListData);
  }, [taskGroupListData]);

  const [taskDefinitionList, setTaskDefintionList] =
    useState<TaskDefinitionListData>(undefined);

  const { data: taskDefinitionListData } = useTaskDefinitionList();
  useEffect(() => {
    if (taskDefinitionListData) setTaskDefintionList(taskDefinitionListData);
  }, [taskDefinitionListData]);

  return (
    <LookupData.Provider value={{ taskGroupList, taskDefinitionList }}>
      {children}
    </LookupData.Provider>
  );
}
export const useLookupData = () => useContext(LookupData);
