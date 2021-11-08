const rootKey = 'fund';

const fundKeys={
    all: [rootKey] as const,
    fund:(fundId:number)=>[rootKey, fundId],
    fundSet: (accountId: number)=>[rootKey, 'set', accountId]
}
export default fundKeys;