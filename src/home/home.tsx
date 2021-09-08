import { Fragment } from "react";
import { Text } from "@fluentui/react";
import { Dashboard } from "../dashboard/dashboard";
import { useProfileData } from "../profile/profileProvider";



export const Home = () => {
  const {profile} = useProfileData();

  return (
    <div className="bodyClass">
      {profile? 
      <Text><Dashboard></Dashboard></Text> :
      <Fragment>
        
        {/* <DefaultButton onClick={props.onLogin}>Login</DefaultButton>*/}
        </Fragment>
      }
    </div>
  );
};
