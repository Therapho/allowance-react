import { useMutation } from "react-query";
import { useAppState } from "../../../app/providers/appStateProvider";
import { Constants } from "../../../common/utilities/constants";
import { acceptTaskWeek } from "../api/acceptTaskWeek";
import { TaskWeek } from "../types/taskWeekType";

export const useAcceptTaskWeekMutation = (
  onSuccess?: () => void,
  onSettled?: () => void,  
  onError?: () => void
) => {
  const {setBusy, setError} = useAppState();
  return useMutation(
    (taskWeek: TaskWeek) => {
      const newTaskWeek: TaskWeek = {
        ...taskWeek,
        statusId: Constants.Status.Approved,
      };
      return acceptTaskWeek(newTaskWeek);
    },
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
