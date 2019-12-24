import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import ChangePassword from '../containers/ChangePassword';
import CreateUser from '../containers/CreateUser';

const MainRouter = () => {

  return (
    <HashRouter>

      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/change-password" component={ChangePassword} exact />
        <Route path="/create-user" component={CreateUser} exact />
      </Switch>

    </HashRouter>
  );
}

export default MainRouter;
