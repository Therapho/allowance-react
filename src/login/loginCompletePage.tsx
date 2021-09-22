import { useHistory } from "react-router";
import { useProfile } from "../common/stores/profile/queries/useProfile";
import { isParent } from "../common/stores/profile/types/profileType";

export const LoginCompletePage = () => {
  const { data: profile } = useProfile();
  const history = useHistory();
  if (profile)
    if( !isParent(profile)) 
        history.push("/tasks");
    else
        history.push("/home");
    

  return <main>Logged in</main>;
};
