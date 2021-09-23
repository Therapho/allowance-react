const rootKey = 'task';

const taskKeys={
    all: [rootKey] as const,
    activitySet: (startDate:Date)=>[rootKey, 'activityList', startDate],
    definitionSet: [rootKey, 'definitionList'],
    groupSet: [rootKey, 'groupList'],
    week:(startDate: Date)=>[rootKey, 'week', startDate]

}
export default taskKeys;