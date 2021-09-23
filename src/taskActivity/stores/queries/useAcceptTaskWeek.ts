import { Constants } from "../../../common/utilities/constants";
import useUpdate from "../../../common/utilities/useUpdate";
import { acceptTaskWeek } from "../api/acceptTaskWeek";
import { TaskWeek } from "../types/taskWeekType";

export const useAcceptTaskWeek = (
  onSuccess?: () => void
) => {
  return useUpdate((taskWeek: TaskWeek) => {
    const newTaskWeek: TaskWeek = {
      ...taskWeek,
      statusId: Constants.Status.Approved,
    };
    return acceptTaskWeek(newTaskWeek);
  }, onSuccess);
};
export default useAcceptTaskWeek;
