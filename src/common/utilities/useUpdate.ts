import { MutationFunction, useMutation } from "react-query";
import { useAppState } from "../../app/context/appStateProvider";
import { ExtractErrorMessage } from "./extractErrorMessage";

const useUpdate = <TData, TVariables>(
  mutationFn: MutationFunction<TData, TVariables>,
  onSuccess?: () => void,
  onSettled?: () => void,
  onError?: (message: String) => void
) => {
  const { setBusy, setError } = useAppState();
  return useMutation(mutationFn, {
    onMutate: () => setBusy(true),
    onSuccess: () => onSuccess && onSuccess(),
    onSettled: () => {
      setBusy(false);
      onSettled && onSettled();
    },

    onError: (error) => {
      const message = ExtractErrorMessage(error);
      setError(message);
      onError && onError(message)},
  });
};

export default useUpdate;
