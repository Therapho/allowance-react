

export type Lookup ={
    id: number;
    name: string;
  }
  
 
export type LookupSet = Lookup[];


export type LookupData = Lookup | undefined;
export type LookupListData = LookupSet | undefined;

export const findLookupName = (lookupList: LookupSet, id:number) => {
  return lookupList.find(item => item.id === id)?.name;
 }

 export const findLookupId = (lookupList: LookupSet, name:string) => {
  return lookupList.find(item => item.name === name)?.id;
 }