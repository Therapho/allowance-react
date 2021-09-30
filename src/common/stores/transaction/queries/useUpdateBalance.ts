import useUpdate from "../../../utilities/useUpdate";
import { updateBalance } from "../api/updateBalance";

export const useUpdateBalance = (
  onSuccess?: () => void
) => {
  return useUpdate(updateBalance, onSuccess);
};
export default useUpdateBalance;
