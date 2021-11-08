import useUpdate from "../../../utilities/useUpdate";
import { deleteFund } from "../api/deleteFund";

export const useDeleteFund = (
    onSuccess?: () => void
  ) => {
    return useUpdate(deleteFund, onSuccess);
  };
  export default useDeleteFund;
  