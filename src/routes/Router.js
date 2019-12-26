import React from 'react';
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
import QRCard from '../containers/QRCard';
import ChangePassword from '../containers/ChangePassword';
import CreateUser from '../containers/CreateUser';

const MainRouter = () => {

  return (
    <HashRouter>

      <Switch>
        <Redirect from="/" to="/qr-code" exact/>
        <Route path="/qr-code" component={QRCard} exact />
        <Route path="/change-password" component={ChangePassword} exact />
        <Route path="/create-user" component={CreateUser} exact />
      </Switch>

    </HashRouter>
  );
}

export default MainRouter;
