import { Stack } from "@fluentui/react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Header } from "../header/header";
import { Home } from "../home/home";
import { LeftPanel } from "../leftPanel/leftPanel";
import { LoginPage } from "../login/loginPage";
import { LookupProvider } from "../lookup/lookupProvider";
import { useProfileData } from "../profile/profileProvider";
import { Settings } from "../settings/settings";
import { Tasks } from "../tasks/tasks";

export const Layout = () => {
  const history = useHistory();
  const {profile} = useProfileData();
 
  const handleNavigate = (url: string) => {
    history.push(url);
  };
  return (
    <Stack className="stackFill">
      <Header />
      {profile?
      <Stack verticalFill horizontal className="stackFill">
        <LeftPanel handleNavigate={handleNavigate} />
        <LookupProvider>
        <Switch>
          <Route path="/" exact render={() => <Home/>} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/settings" component={Settings} />
        </Switch>
        </LookupProvider>
      </Stack>
      : <LoginPage/>}
    </Stack>
  );
};
