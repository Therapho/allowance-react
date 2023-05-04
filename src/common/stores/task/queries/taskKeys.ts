const rootKey = 'task';

const taskKeys={
    all: [rootKey] as const,
    activitySet: (startDate:Date, accountId:number)=>[rootKey, 'activitySet', startDate, accountId],
    definitionSet: [rootKey, 'definitionSet'],
    groupSet: [rootKey, 'groupSet'],
    week:(startDate: Date, accountId: number)=>[rootKey, 'week', startDate, accountId],
    weekSet: (startDate: Date, endDate:Date, accountId?:number)=>[rootKey, 'weekset', startDate, endDate, accountId]

}
export default taskKeys;