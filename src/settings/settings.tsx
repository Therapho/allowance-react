import { Label } from "@fluentui/react";
import Card from "../common/components/card/card";
import { useProfile } from "../common/stores/profile/queries/useProfile";
export const Settings = () => {
 
  const {data:profile} = useProfile();
  return(
  <main>
    <h1> Settings</h1>
    <Card>
      <Label>User ID:</Label>
      {profile?.userId} 
    </Card>
    </main>
  )
  };
