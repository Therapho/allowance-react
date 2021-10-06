import { Label } from "@fluentui/react";
import Card from "../common/components/card/card";
import { useProfile } from "../common/stores/profile/queries/useProfile";
import ThemeSelector from "./components/themeSelector";
export const Settings = () => {
 
  const {data:profile} = useProfile();
  return(
  <main>
    <h1> Settings</h1>
    <Card width={200}>
      <Label>User ID:</Label>
      {profile?.userId} 
      <Label>Theme</Label>
      <ThemeSelector/>
    </Card>
    </main>
  )
  };
