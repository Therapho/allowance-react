import useUpdate from "../../../utilities/useUpdate";
import { postFund } from "../api/postFund";

export const usePostFund = (onSuccess?: () => void) => {
  return useUpdate(postFund, onSuccess);
};
export default usePostFund;
