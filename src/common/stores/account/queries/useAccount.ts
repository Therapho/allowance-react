import { useQuery } from "react-query";
import { useProfile } from "../../profile/queries/useProfile";
import { getAccountById } from "../api/getAccountById";

export const useAccount = () => {
  const { data: profile } = useProfile();
  const userId = profile?.userId;
  const cacheKey = ["account", { userid: userId }];

  return useQuery(cacheKey, () => getAccountById(userId), {
    enabled: !!userId,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
