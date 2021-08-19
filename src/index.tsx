import React from "react";
import ReactDOM from "react-dom";
import { initializeIcons, mergeStyles } from "@fluentui/react";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";

initializeIcons();
// Inject some global styles
mergeStyles({
  ":global(body,html,#root)": {
    margin: 0,
    padding: 0,
    height: "100vh",
  },
});

//store.dispatch(getProfile);

ReactDOM.render(
  <React.StrictMode>
    
      <BrowserRouter>
      <Provider store={store}>
        <App />
        </Provider>
      </BrowserRouter>
   
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
