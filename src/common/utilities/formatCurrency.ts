export const formatCurrency= (value:number|undefined) =>{
    return value?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
}