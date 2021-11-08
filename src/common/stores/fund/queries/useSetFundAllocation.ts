import useUpdate from "../../../utilities/useUpdate";
import { setFundAllocation } from "../api/setFundAllocation";

export const useSetFundAllocation = (
    onSuccess?: () => void
  ) => {
    return useUpdate(setFundAllocation, onSuccess);
  };
  export default useSetFundAllocation;
  