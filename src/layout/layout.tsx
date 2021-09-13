import { IStackStyles, Stack } from "@fluentui/react";
import { Fragment } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppState } from "../app/appStateProvider";
import { Header } from "../header/header";
import { Home } from "../home/home";
import { LeftPanel } from "../leftPanel/leftPanel";
import { LoginPage } from "../login/loginPage";
import { useProfile } from "../profile/queries/useProfile";
import { Settings } from "../settings/settings";
import { TaskPage } from "../tasks/containers/taskList";
import BusyOverlay from "./busyOverlay";

export const Layout = () => {

  const stackFillStyles:IStackStyles = {
    root: {
      height:"100%",
      width:"100%"
    }
  }
  const history = useHistory();
  const { busy } = useAppState();

  const { data: profile } = useProfile();

  const handleNavigate = (url: string) => {
    history.push(url);
  };
  return (
    <Fragment>
      <Stack styles={stackFillStyles}>
        <Header />
        {profile ? (
          <Stack verticalFill horizontal styles={stackFillStyles}>
            <LeftPanel handleNavigate={handleNavigate} />

            <Switch>
              <Route path="/" exact render={() => <Home />} />
              <Route path="/tasks" component={TaskPage} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </Stack>
        ) : (
          <LoginPage />
        )}
      </Stack>
      <BusyOverlay busy={busy}/>
    </Fragment>
  );
};
