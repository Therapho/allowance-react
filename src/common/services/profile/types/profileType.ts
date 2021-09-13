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
