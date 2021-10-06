import { mergeStyles, Stack, ThemeProvider } from "@fluentui/react";
import {  useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { Home } from "../../../home/home";
import { Login } from "../../../login/components/login/login";
import { LoginCompletePage } from "../../../login/loginCompletePage";
import { LoginLink } from "../../../login/components/loginLink/loginLink";
import { Settings } from "../../../settings/settings";
import { TaskPage } from "../../../taskActivity/taskActivityPage";
import { useAppState } from "../../context/appStateProvider";
import BusyOverlay from "../busyOverlay/busyOverlay";
import { Header } from "../header/header";
import { LeftPanel } from "../leftPanel/leftPanel";

import * as layoutStyles from "./layout.styles"
import TransactionPage from "../../../transactions/transactionPage";
import { Menu } from "../menu/menu";
import TaskWeekListPage from "../../../taskWeekList/taskWeekListPage";
import { darkTheme, lightTheme } from "../../context/app.themes";
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
  const {selectedTheme} = useAppState();
  const theme = (selectedTheme === "Light" ? lightTheme :darkTheme);
  mergeStyles({
    ":global(a)": { color:theme.palette.themePrimary}
  })

  return (
    <ThemeProvider theme={theme} applyTo="body">
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
            <Route path="/taskweeklist" component={TaskWeekListPage}/>
          </Switch>
        ) : (
          <Login />
        )}
      </Stack>

      <BusyOverlay busy={busy} />
    </ThemeProvider>
  );
};
