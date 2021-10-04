import { Constants } from "../../../utilities/constants";

export type Profile = {
  userId: string;
  userRoles: string[];
  identityProvider: string;
  userDetails: string;
};

export const makeProfile = (principal: any) :Profile => {
  return {
    userId: principal.userid,
    userRoles: principal.userRoles,
    identityProvider: principal.identityProvider,
    userDetails: principal.userDetails,
  };
};
export const checkIfParent = (profile: Profile | undefined) => {
  if(profile && profile.userRoles.find(r=>r===Constants.RoleNames.Parent)) return true;
  else return false;  
}