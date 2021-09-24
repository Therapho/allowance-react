const rootKey = "transaction";

const transactionKeys = {
  all: [rootKey] as const,
  transactionSet:(accountId?:number)=> [rootKey, "transactionSet", accountId]
};

export default transactionKeys;
