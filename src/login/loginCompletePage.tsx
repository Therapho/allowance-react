import { useHistory } from "react-router";
import { useProfile } from "../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../common/stores/profile/types/profileType";

export const LoginCompletePage = () => {
  const { data: profile } = useProfile();
  const history = useHistory();
  if (profile)
    if( !checkIfParent(profile)) 
        history.push("/tasks");
    else
        history.push("/home");
    

  return <main>Logged in</main>;
};
