export type TaskDefinition ={
    id: number;
    taskGroupId: number;
    description: string;
    value: number;
    sequence: number;
    weekly: boolean;
    
  }

  export type TaskDefinitionList = TaskDefinition[];

  export type TaskDefinitionData = TaskDefinition | undefined;

  export type TaskDefinitionListData = TaskDefinitionList | undefined;
  
  export const findTaskDescription = (taskDefinitionList: TaskDefinitionList, id=0) => {
    
    return taskDefinitionList?.find(item => item.id === id)?.description;
   }
  
   export const findTaskId = (taskDefinitionList: TaskDefinitionList, description:string) => {
    return taskDefinitionList.find(item => item.description === description)?.id;
   }
  