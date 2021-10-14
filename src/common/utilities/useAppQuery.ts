import { QueryFunction, QueryKey, useQuery, UseQueryResult } from "react-query";

export const useAppQuery = <TQueryFnData, TError, TData, TQueryKey extends QueryKey
>(
  queryKey: TQueryKey,
  queryFn: (QueryFunction<TQueryFnData, TQueryKey>),
  staleTime?: number
):UseQueryResult<TData, TError> => {
  //const { setError, setBusy } = useAppState();
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey, queryFn,
    {
      staleTime,

     // onSettled: () => setBusy(false),
      //onError: (error) => setError(error as string),
    }
  );
};
