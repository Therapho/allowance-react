import { MutationFunction, useMutation } from "react-query";
import { useAppState } from "../../app/providers/appStateProvider";

export default <TData, TVariables>(
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
        setError(error as string);
        onError && onError()},
    }
  );
};
