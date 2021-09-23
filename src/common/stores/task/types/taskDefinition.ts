
export type TaskDefinition ={
    id: number;
    taskGroupId: number;
    description: string;
    value: number;
    sequence: number;
    weekly: boolean;
    
  }

  export type TaskDefinitionSet = TaskDefinition[];

  export type TaskDefinitionData = TaskDefinition | undefined;

  export type TaskDefinitionSetData = TaskDefinitionSet | undefined;
  

  export const findTaskDescription = (taskDefinitionSet: TaskDefinitionSet, id=0) => {
    
    return taskDefinitionSet?.find(item => item.id === id)?.description;
   }
  
   export const findTaskId = (taskDefinitionSet: TaskDefinitionSet, description:string) => {
    return taskDefinitionSet.find(item => item.description === description)?.id;
   }
  