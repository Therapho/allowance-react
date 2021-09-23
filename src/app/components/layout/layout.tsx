import { Stack } from "@fluentui/react";
import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { Home } from "../../../home/home";
import { Login } from "../../../login/components/login";
import { LoginCompletePage } from "../../../login/loginCompletePage";
import { LoginLink } from "../../../login/loginLink";
import { Settings } from "../../../settings/settings";
import { TaskPage } from "../../../taskActivity/taskActivityPage";
import { useAppState } from "../../context/appStateProvider";
import BusyOverlay from "../busyOverlay/busyOverlay";
import { Header } from "../header/header";
import { LeftPanel } from "../leftPanel/leftPanel";

import * as layoutStyles from "./layout.styles"
import TransactionPage from "../../../transactions/transactionPage";
import { Menu } from "../menu/menu";
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
            <Route path="/transactions" component={TransactionPage}/>
          </Switch>
        ) : (
          <Login />
        )}
      </Stack>

      <BusyOverlay busy={busy} />
    </div>
  );
};
