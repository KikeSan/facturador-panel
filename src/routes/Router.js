import React from 'react';
import {
  Redirect, HashRouter, Route, Switch,
} from 'react-router-dom';

import NavigationComponent from '../components/Navigation/Navigation';
import QRCardContainer from '../containers/QRCard';
import ChangePasswordComponent from '../components/ChangePassword/ChangePassword';
import CreateUserContainer from '../containers/CreateUser';
import LoginComponent from '../components/Login/Login';

const MainRouter = () => (

  <HashRouter>
    <NavigationComponent />
    <Switch>
      <Route exact path="/qr-code" component={QRCardContainer} />
      <Route
        exact
        path="/change-password"
        render={() => (
          <LoginComponent render={(_userData) => (<ChangePasswordComponent userData={_userData} />)} />
        )}
      />
      <Route exact path="/create-user" component={CreateUserContainer} />
      <Redirect from="/" to="/qr-code" exact />
    </Switch>

  </HashRouter>


);

export default MainRouter;
