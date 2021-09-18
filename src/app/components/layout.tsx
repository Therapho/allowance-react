import { Stack } from "@fluentui/react";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppState } from "../providers/appStateProvider";
import { Home } from "../../home/home";
import { LoginPage } from "../../login/login";
import { useProfile } from "../../common/services/profile/queries/useProfile";
import { Settings } from "../../settings/settings";
import { TaskPage } from "../../tasks/pages/taskList";
import BusyOverlay from "./busyOverlay";
import { Header } from "./header";
import { Menu } from "../../menu/menu";
import { Login } from "../../login/loginLink";
import { stackFillStyles } from "./layout.styles";
import { LeftPanel } from "./leftPanel";

export const Layout = () => {
  const history = useHistory();
  const { busy } = useAppState();

  const { data: profile } = useProfile();
  const handleNavigate = (url: string) => {
    handleMenuDismiss();
    history.push(url);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleMenuDismiss = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <LeftPanel onMenuDismiss={handleMenuDismiss} isOpen={isMenuOpen}>
        <Menu onNavigate={handleNavigate} />
        <Login />
      </LeftPanel>
      <Stack styles={stackFillStyles}>
        <Header oneMenuOpen={handleMenuToggle} />
        {profile ? (
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/tasks" component={TaskPage} />
            <Route path="/settings" component={Settings} />
          </Switch>
        ) : (
          <LoginPage />
        )}
      </Stack>

      <BusyOverlay busy={busy} />
    </div>
  );
};
