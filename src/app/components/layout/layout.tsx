import { IPalette, mergeStyles, MessageBar, MessageBarType, Stack, ThemeProvider } from "@fluentui/react";
import { Fragment, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { Home } from "../../../home/home";
import { Login } from "../../../login/components/login/login";
import { LoginCompletePage } from "../../../login/loginCompletePage";
import { LoginLink } from "../../../login/components/loginLink/loginLink";
import { Settings } from "../../../settings/settings";
import { TaskPage } from "../../../taskActivity/taskActivityPage";
import { useAppState } from "../../context/appStateProvider";
import { Header } from "../header/header";
import { LeftPanel } from "../leftPanel/leftPanel";

import LayoutStyles from "./layout.styles"
import TransactionPage from "../../../transactions/transactionPage";
import { Menu } from "../menu/menu";
import TaskWeekListPage from "../../../taskWeekList/taskWeekListPage";
import { blueTheme, greenTheme, turquoiseTheme } from "../../context/app.themes";
import FundsPage from "../../../funds/fundsPage";
import BusyOverlay from "../busyOverlay/busyOverlay";
import DashboardPage from "../../../dashboard/dashboardPage";


export const Layout = () => {
  const history = useHistory();

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
  const { selectedColor, selectedTheme, error, setError, busy } = useAppState();
  const findTheme = (selectedColor: string, selectedTheme: string) => {
    let colorScheme = { light: { palette: {} as IPalette }, dark: { palette: {} as IPalette } };
    switch (selectedColor) {
      case "Blue": colorScheme = blueTheme;
        break;
      case "Green": colorScheme = greenTheme;
        break;
      case "Turquoise": colorScheme = turquoiseTheme;

    }
    return selectedTheme === "Light" ? colorScheme.light : colorScheme.dark;
  }
  const theme = findTheme(selectedColor, selectedTheme);

  mergeStyles({
    ":global(a)": { color: theme.palette.themePrimary }
  })

  return (
    <ThemeProvider theme={theme} applyTo="body">
      <LeftPanel onMenuDismiss={handleMenuDismiss} isOpen={isMenuOpen}>
        <Menu onNavigate={handleNavigate} />
        <LoginLink />
      </LeftPanel>
      <Stack styles={LayoutStyles.stack}>
        <Header
          onMenuOpen={handleMenuToggle}

        />
        {profile ? (
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/tasks" component={TaskPage} />
            <Route path="/settings" component={Settings} />
            <Route path="/logincomplete" component={LoginCompletePage} />
            <Route path="/transactions" component={TransactionPage} />
            <Route path="/taskweeklist" component={TaskWeekListPage} />
            <Route path="/funds" component={FundsPage} />
            <Route path="/dashboard" component={DashboardPage} />
          </Switch>
        ) : (
          <Fragment>
            <Route path="/dashboard" component={DashboardPage} />
            <LoginLink />
          </Fragment>


        )}
      </Stack>

      <BusyOverlay busy={busy} />

      {error && (
        <MessageBar className={LayoutStyles.messageBar}
          messageBarType={MessageBarType.error}
          isMultiline={false}
          onDismiss={() => setError("")}
          dismissButtonAriaLabel="Close"
        >
          {error}
        </MessageBar>
      )}
    </ThemeProvider>
  );
};
