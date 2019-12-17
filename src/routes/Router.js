import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import ChangePassword from '../containers/ChangePassword';

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/change-password" component={ChangePassword} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
