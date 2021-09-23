
import useUpdate from "../../../utilities/useUpdate";
import { putTaskActivityList } from "../api/putTaskActivitySet";

export const useTaskActivityListMutation = (
  onSuccess?: () => void
) => {
  return useUpdate(putTaskActivityList, onSuccess);
};
