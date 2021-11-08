import useUpdate from "../../../utilities/useUpdate";
import { updateFund } from "../api/updateFund";

export const useUpdateFund = (
    onSuccess?: () => void
  ) => {
    return useUpdate(updateFund, onSuccess);
  };
  export default useUpdateFund;
  