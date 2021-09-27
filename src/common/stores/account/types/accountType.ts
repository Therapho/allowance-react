export type Account = {
  
    id: number;
    roleId: number;
    name: string;
    balance: number;
    userIdentifier: string;
    activeTaskWeekId?: number; 
    
}
export type AccountSet = Account[];
export const findAccountName = (accountSet: AccountSet, id:number) => {
    return accountSet.find(item => item.id === id)?.name;
   }
  