import { Text } from "@fluentui/react";
import { useAppSelector } from "../../store/hooks";
import { getProfile, Profile } from "./profileSlice";
const ProfileComponent = () => {
  const selector = useAppSelector((state)=>state.profile);
  const profile = selector.data;
  return(
    <div className='profile'>
      <Text>{profile?.userDetails}</Text>
    </div>
  );
}
  export default ProfileComponent;
