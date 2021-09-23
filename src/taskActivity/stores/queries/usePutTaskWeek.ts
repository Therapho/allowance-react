
import useUpdate from "../../../common/utilities/useUpdate";
import { putTaskWeek } from "../api/saveTaskWeek";
import { TaskWeek } from "../types/taskWeekType";

export const usePutTaskWeek = (
  onSuccess?: () => void
) => {
  return useUpdate((taskWeek: TaskWeek) => {    
    return putTaskWeek(taskWeek);
  }, onSuccess);
};
export default usePutTaskWeek;
