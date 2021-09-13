

export type Lookup ={
    id: number;
    name: string;
  }
  
 
export type LookupList = Lookup[];


export type LookupData = Lookup | undefined;
export type LookupListData = LookupList | undefined;

export const findLookupName = (lookupList: LookupList, id:number) => {
  return lookupList.find(item => item.id === id)?.name;
 }

 export const findLookupId = (lookupList: LookupList, name:string) => {
  return lookupList.find(item => item.name === name)?.id;
 }