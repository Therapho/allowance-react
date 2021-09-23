export type TaskActivity = {

    id?: number;
    taskGroupId: number;
    taskDayId: number;
    sequence: number;
    taskWeekId: number;
    mondayStatusId: number;
    tuesdayStatusId: number;
    wednesdayStatusId: number;
    thursdayStatusId: number;
    fridayStatusId: number;
    saturdayStatusId: number;
    sundayStatusId: number;
    daySequence: number;
    taskDefinitionId: number;
    userIdentifier: string;
    
 }
 export type TaskActivitySet = TaskActivity[];
 