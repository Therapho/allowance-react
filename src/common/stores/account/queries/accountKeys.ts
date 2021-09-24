const rootKey = "account";

export const accountKeys = {
  all: [rootKey] as const,
  account: (userId: string) => [rootKey, userId],
  accountSet: (role:string) => [rootKey, role]
};
