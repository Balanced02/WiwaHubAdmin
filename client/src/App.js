import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
// Styles
// CoreUI Icons Set
import "@coreui/icons/css/coreui-icons.min.css";
// Import Flag Icons Set
import "flag-icon-css/css/flag-icon.min.css";
// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";
// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";
// Import Main styles for this application
import "./scss/style.css";
import Alert from "./components/Alert";

import { Provider } from "react-redux";

import { createHashHistory } from "history";
// Containers
import { DefaultLayout } from "./containers";
// Pages
import { Login, Page404, Page500, Register, AboutUs } from "./views/Pages";

import Home from './views/HomePage'

import configureStore from "./store";
const store = configureStore(() => {});

// import { renderRoutes } from 'react-router-config';
export const history = createHashHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <HashRouter history={history}>
            <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              <Route
                exact
                path="/register"
                name="Register Page"
                component={Register}
              />
              <Route exact path="/aboutUs" name="About Us" component={AboutUs} />
              {/* <Route exact path="/500" name="Page 500" component={Page500} /> */}
              <Route path="/app" name="Home" component={DefaultLayout} />
              <Route exact path="/" name="WiwaHub" component={Home} />
              <Route exact path="*" name="Page 404" component={Page404} />
            </Switch>
          </HashRouter>
          <Alert />
        </div>
      </Provider>
    );
  }
}

export default App;
