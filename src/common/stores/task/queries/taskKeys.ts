const rootKey = 'task';

const taskKeys={
    all: [rootKey] as const,
    activitySet: (startDate:Date)=>[rootKey, 'activitySet', startDate],
    definitionSet: [rootKey, 'definitionSet'],
    groupSet: [rootKey, 'groupSet'],
    week:(startDate: Date)=>[rootKey, 'week', startDate]

}
export default taskKeys;