export class Constants {
    public static get ActivityStatus() {
      return { Incomplete: 1, Complete: 2, Blocked: 3};
    }
    public static get Role() {
      return {Parent: 1, Child: 2};
    }
    public static get RoleNames()  {
      return {Parent:"Parent", Child:"Child"}
    }
    public static get Status() {
      return {Open: 1, Submitted: 2, Approved: 3, Rejected: 4};
    }
    public static get TransactionCategory() {
      return {Deposit: 1, Withdrawal: 2};
    }
  
    public static get MessageType() {
      return {None: 0, Information: 1, Warning: 2, Error: 3};
    }
    public static get Day() {
      return {Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7};
    }
  }
export const minutes = 60000;