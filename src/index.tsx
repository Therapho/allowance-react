import './index.scss'
import React from "react";
import ReactDOM from "react-dom";
import { getTheme, initializeIcons, mergeStyles } from "@fluentui/react";
import reportWebVitals from "./reportWebVitals";
import App from "./app/app";
import { AppStateProvider } from './app/context/appStateProvider';

const theme = getTheme();
initializeIcons();
// Inject some global styles

mergeStyles({
  ":global(body,html,#root)": {
    margin: 0,
    padding: 0,
    height: "100vh",
    webkitUserSelect: "none",
    webKitTouchCallout: "none",
    mozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
  },
  ":root":{
    "--background": theme.palette.themeLighterAlt,
    "--border": theme.palette.themeLighter,
    "--color": theme.palette.themePrimary,

  }
});

//store.dispatch(getProfile);

ReactDOM.render(
  
  <React.StrictMode> 
    <AppStateProvider>        
    <App />     
    </AppStateProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
