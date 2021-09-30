import { AxiosError } from "axios";
import { MutationFunction, useMutation } from "react-query";
import { useAppState } from "../../app/context/appStateProvider";

const useUpdate= <TData, TVariables>(
    mutationFn: MutationFunction<TData, TVariables>,
  onSuccess?: () => void,
  onSettled?: () => void,  
  onError?: () => void
) => {
  const {setBusy, setError} = useAppState();
  return useMutation(mutationFn,
    {
      onMutate: ()=> setBusy(true),
      onSuccess: () => onSuccess && onSuccess(),
      onSettled: () => {
        setBusy(false);
        onSettled && onSettled()},
      
      onError: (error) => {
        const axiosError = error as AxiosError;
        setError(axiosError.message);
        onError && onError()},
    }
  );
};

export default useUpdate;
