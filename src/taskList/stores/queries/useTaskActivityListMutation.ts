
import useUpdate from "../../../common/utilities/useUpdate";
import { putTaskActivityList } from "../api/putTaskActivityList";

export const useTaskActivityListMutation = (
  onSuccess?: () => void
) => {
  return useUpdate(putTaskActivityList, onSuccess);
};
