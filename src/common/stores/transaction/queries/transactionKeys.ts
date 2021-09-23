const rootKey = "transaction";

const transactionKeys = {
  all: [rootKey] as const,
  transactionSet: [rootKey, "transactionSet"]
};

export default transactionKeys;
