import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import ChangePassword from '../containers/ChangePassword';

const MainRouter = () => {

  return (
    <HashRouter>

      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/change-password" component={ChangePassword} exact />
      </Switch>

    </HashRouter>
  );
}

export default MainRouter;
