const rootKey = "transactionLog";

const transactionKeys = {
  all: [rootKey] as const,
  transactionLogSet:(accountId?:number)=> [rootKey, "set", accountId]
};

export default transactionKeys;
