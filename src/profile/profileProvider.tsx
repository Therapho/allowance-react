import { createContext, useContext, useEffect, useState } from "react";
import { Account } from "../account/accountType";
import { useAccount } from "../account/useAccount";
import { Profile } from "./types/profileType";
import { useProfile } from "./queries/useProfile";

export type ProfileType = {
    profile: Profile | undefined;
    account: Account | undefined;

  };
  
const ProfileData = createContext<ProfileType>(undefined!);

export default ProfileData;

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    
    const { data:profile } = useProfile();
    const { data: account } = useAccount(profile?.userId);
    
    return (
      <ProfileData.Provider value={{ profile, account }}>{children}</ProfileData.Provider>
    );
  }
  export const useProfileData = () => useContext(ProfileData);