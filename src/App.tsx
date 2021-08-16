import { Component } from "react";
import {
  Stack,
  Text,
  IStackTokens,
  IStackStyles,
  FontIcon,
  mergeStyles,
  getTheme,
} from "@fluentui/react";
import "./App.css";
import { Menu } from "./components/Menu";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Home } from "./pages/home";
import { Settings } from "./pages/settings";
  import { Profile } from "./components/Profile";

initializeIcons();

const theme = getTheme();

const stackTokens: IStackTokens = {};
const stackStyles: IStackStyles = {
  root: {},
};

const iconClass = mergeStyles({
  fontSize: 25,
  height: 25,
  width: 25,
  margin: "20px",
});
const headerClass = mergeStyles({
  backgroundColor: theme.palette.themeDark,
  color: theme.palette.themeLighterAlt,
  height: 64,
});
const headerTextClass = mergeStyles({
  color: theme.palette.themeLighterAlt,
  fontSize: 18,
  fontWeight: "bold",
});

class App extends Component {
  render() {
    return (
      <Stack styles={stackStyles} tokens={stackTokens} verticalFill>
        <Stack
          styles={stackStyles}
          tokens={stackTokens}
          horizontal
          verticalAlign="center"
          className={headerClass}
        >
          <FontIcon
            aria-label="Currency"
            iconName="AllCurrency"
            className={iconClass}
          />
          <Text className={headerTextClass}>Allowance</Text>
          <div className="profile">
            <Profile />
          </div>
        </Stack>
        <Stack verticalFill horizontal>
          <Router>
            <Menu />

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </Router>
        </Stack>
      </Stack>
    );
  }
}
export default App;
