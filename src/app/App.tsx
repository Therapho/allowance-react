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

import {  Route, Switch } from "react-router-dom";
import ProfileComponent from "../features/profile/ProfileComponent";
import { Menu } from "../features/menu/Menu";
import { Settings } from "../features/settings/settings";
import { Home } from "../features/home/home";

const theme = getTheme();

const stackTokens: IStackTokens = {};
const stackStyles: IStackStyles = {
  root: {},
};


const headerClass = mergeStyles({
  backgroundColor: theme.palette.themeDark,
  color: theme.palette.themeLighterAlt,
  minHeight: 32
  
});
const headerTextClass = mergeStyles({
  color: theme.palette.themeLighterAlt

});

function App() {  
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
            className='iconClass'
          />
          <Text className={headerTextClass}>Allowance</Text>
          <div className="profile">
            <ProfileComponent />
          </div>
        </Stack>
        <Stack verticalFill horizontal>
         
            <Menu />

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/settings" component={Settings} />
            </Switch>
          
        </Stack>
      </Stack>
    );
  }

export default App;
