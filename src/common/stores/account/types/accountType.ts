export type Account = {
  
    id: number;
    roleId: number;
    name: string;
    balance: number;
    userIdentifier: string;
    activeTaskWeekId?: number; 
    
}
export type AccountSet = Account[];