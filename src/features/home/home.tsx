import React, { Fragment } from "react";
import { DefaultButton, Text } from "@fluentui/react";
import { useAppSelector } from "../../store/hooks";
import { Dashboard } from "../dashboard/dashboard";

type HomeProps = {
  onLogin: (event: any) => any
}
export const Home = (props: HomeProps) => {
  const selector = useAppSelector((state)=>state.profile);
  const profile = selector.data;
  return (
    <div className="bodyClass">
      {profile? 
      <Text><Dashboard></Dashboard></Text> :
      <Fragment><h1>Welcome</h1> <p> Please login to access your information.</p>
        <DefaultButton onClick={props.onLogin}>Login</DefaultButton></Fragment>
      }
    </div>
  );
};
