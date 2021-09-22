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
export const isParent = (profile: Profile) => {
  if(profile.userRoles.find(r=>r==="Parent")) return true;
  else return false;  
}