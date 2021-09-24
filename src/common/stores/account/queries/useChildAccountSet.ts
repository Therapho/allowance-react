import { useQuery } from "react-query";
import { Constants, minutes } from "../../../utilities/constants";
import { getAccountByRole } from "../api/getAccountSetByRole";
import { accountKeys } from "./accountKeys";

export const useChildAccountSet = () => {
  const cacheKey = accountKeys.accountSet(Constants.RoleNames.Child);
  return useQuery(cacheKey, () => getAccountByRole(Constants.Role.Child), {
    staleTime: 30 * minutes
  });
};
