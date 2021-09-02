import { Stack } from "@fluentui/react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Menu } from "../features/menu/Menu";
import { Settings } from "../features/settings/settings";
import { Home } from "../features/home/home";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getProfile } from "../store/slices/profileSlice";
import { Header } from "../features/header/header";
import "./App.scss";
import { getAccount } from "../store/slices/accountSlice";
import { Tasks } from "../features/tasks/tasks";

function App() {
  const redirect = window.location.pathname;
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.profile);
  const history = useHistory();
  const status = selector.status;
  const profile = selector.data;

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProfile());
    }
  }, [status, dispatch]);

  useEffect(()=>{
    if(profile){
      dispatch(getAccount(profile.userId));
    }
  }, [profile, dispatch])
  const handleLogin = (event: MouseEvent) => {
    event.preventDefault();

    window.location.href =
      "/.auth/login/aad?post_login_redirect_uri=" + redirect;
  };
  const handleLogout = (event: MouseEvent) => {
    event.preventDefault();
    window.location.href = "/.auth/logout?post_logout_redirect_uri=" + redirect;
  };
  const handleNavigate = (url: string) => {
    history.push(url);
  };

  return (
    <Stack className='stackFill'>
      <Header/>
      <Stack verticalFill horizontal className='stackFill'>
        <Menu
          onLogin={handleLogin}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />

        <Switch>
          <Route
            path="/"
            exact
            render={() => <Home onLogin={handleLogin}></Home>}
          />
          <Route path="/tasks" component={Tasks}/>
          <Route path="/settings" component={Settings} />
        </Switch>
      </Stack>
    </Stack>
  );
}
export default App;
