import { Stack } from "@fluentui/react";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAppState } from "../providers/appStateProvider";
import { Home } from "../../home/home";
import { Login } from "../../login/components/login";
import { useProfile } from "../../common/stores/profile/queries/useProfile";
import { Settings } from "../../settings/settings";
import { TaskPage } from "../../taskList/taskList";
import BusyOverlay from "./busyOverlay";
import { Header } from "./header";
import { Menu } from "../../menu/menu";
import { LeftPanel } from "./leftPanel";
import { LoginLink } from "../../login/loginLink";
import { LoginCompletePage } from "../../login/loginCompletePage";
import layoutStyles from "./layout.styles";

export const Layout = () => {
  const history = useHistory();
  const { busy, error, clearError } = useAppState();

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
        <LoginLink />
      </LeftPanel>
      <Stack styles={layoutStyles.stackFillStyles}>
        <Header
          onMenuOpen={handleMenuToggle}
          error={error}
          onCloseError={clearError}
        />
        {profile ? (
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/tasks" component={TaskPage} />
            <Route path="/settings" component={Settings} />
            <Route path="/logincomplete" component={LoginCompletePage} />
          </Switch>
        ) : (
          <Login />
        )}
      </Stack>

      <BusyOverlay busy={busy} />
    </div>
  );
};
