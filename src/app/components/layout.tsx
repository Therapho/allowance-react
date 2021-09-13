import { IStackStyles, Stack } from "@fluentui/react";
import { Fragment } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppState } from "../providers/appStateProvider";

import { Home } from "../../home/home";
import { LeftPanel } from "./leftPanel";
import { LoginPage } from "../../login/login";
import { useProfile } from "../../common/services/profile/queries/useProfile";
import { Settings } from "../../settings/settings";
import { TaskPage } from "../../tasks/pages/taskList";
import BusyOverlay from "./busyOverlay";
import { Header } from "./header";

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
