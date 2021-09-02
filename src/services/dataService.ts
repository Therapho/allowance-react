import { Account } from "../store/entities/account";
import axios from "axios";
import { Lookup } from "../store/entities/lookup";

const DataService = {
   
    
    async getAccount(userId: string): Promise<Account> {
        console.log(`Retrieving account {userId} from /api/accountset`)
        const response = await axios.get("/api/accountset?userid=" + userId);
        return response.data[0];
    },
    //     const parameters = new HttpParams().set('useridentifier', userIdentifier);
    //     const options = {params: parameters};
    
    //     return new Promise<Account>((resolve, reject) => {
    //       this.client.get<Account[]>(environment.dataApiUrl + '/accountset' , options).toPromise()
    //       .then(accountList => resolve(Account.map(accountList[0])))
    //       .catch(error => reject(error));
    //     });
    
    //   }
    //   getAccountList(): Promise<Account[]> {
    //     return this.client.get<Account[]>(environment.dataApiUrl + '/accountset')
    //       .pipe(map((list: Account[]) => list.map(data => Account.map(data))))
    //       .toPromise();
    
    //   }
    //   updateBalance(transaction: Transaction): Promise<any> {
    //     return this.client.post(environment.dataApiUrl + '/updatebalance', transaction).toPromise();
    //   }
      async getTaskGroupList(): Promise<Lookup[] > {        
            const response = await axios.get<Lookup[]>('api/lookups/taskgroupset')
            return response.data;
        
      },
    
    //   public getRoleList(): Promise < Lookup[] > {
    //     return new Promise<Lookup[]>((resolve, reject) => {
    //       this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/roleset').toPromise()
    //       .then(lookup => resolve(lookup))
    //       .catch(error => reject(error));
    //     });
    //   }
    
    //   public getStatusList(): Promise < Lookup[] > {
    //     return new Promise<Lookup[]>((resolve, reject) => {
    //       this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/statusset').toPromise()
    //       .then(lookup => resolve(lookup))
    //       .catch(error => reject(error));
    //     });
    
    //   }
    //   public getActivityStatusList(): Promise < Lookup[] > {
    //     return new Promise<Lookup[]>((resolve, reject) => {
    //       this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/activitystatusset').toPromise()
    //       .then(lookup => resolve(lookup))
    //       .catch(error => reject(error));
    //     });
    //   }
    //   getTransactionCategoryList() {
    //     return this.client.get<Lookup[]>(environment.dataApiUrl + '/lookups/transactioncategoryset').toPromise();
    //   }
    
    //   public getTransactionLogList(accountId: number): Promise<TransactionLog[]> {
    //     const parameters = new HttpParams().set('accountid', accountId.toString());
    //     const options = {params: parameters};
    
    //     return this.client.get<TransactionLog[]>(environment.dataApiUrl + '/transactionlogset', options)
    //       .pipe(map((list: TransactionLog[]) => list.map(data => TransactionLog.map(data))))
    //       .toPromise();
    //   }
}
export default DataService;
