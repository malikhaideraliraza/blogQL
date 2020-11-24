import React from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import routes from './routes';

const App = () => (
  <Router>
    <Switch>
      { routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          render={props => <AppRoute route={route} props={props} />}
          exact={route.exact}
        />
      )) }
    </Switch>
  </Router>
);

export default App;

const AppRoute = withRouter(({ route, props }) => {

  const L = route.layout;
  const C = route.component;

  if (L) {
    return <L { ...props }><C { ...props } /></L>;
  } else {
    return <C { ...props } />;
  }
});
