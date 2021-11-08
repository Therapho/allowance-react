export type Fund = {
    id?: number;
    accountId: number,
    name: string;
    description: string;
    targetDate?: Date;
    allocation?: number;
    targetBalance?: number;
    balance: number;
    locked: boolean;
}

export type FundSet = Fund[];