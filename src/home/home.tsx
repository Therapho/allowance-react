import { Fragment } from "react";
import { Text } from "@fluentui/react";
import { Dashboard } from "../dashboard/dashboard";
import { useProfile } from "../profile/queries/useProfile";



export const Home = () => {
  const {data:profile} = useProfile();

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
