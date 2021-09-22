const rootKey = 'task';

const taskKeys={
    all: [rootKey] as const,
    activityList: (startDate:Date)=>[rootKey, 'activityList', startDate],
    definitionList: [rootKey, 'definitionList'],
    groupList: [rootKey, 'groupList'],
    week:(startDate: Date)=>[rootKey, 'week', startDate]

}
export default taskKeys;