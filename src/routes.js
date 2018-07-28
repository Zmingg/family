import React, {Component, Fragment} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Article from './containers/Article';
import {AsyncComponent} from 'components/asyncComponent';

const RouteList = [
  /** 首页 */
  { path: '/', component: Home.Home},
  /** 文章 */
  { path: '/article', component: Article.ArticleList},
];

const auth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/passport/login",
            state: {from: props.location}
          }}
        />
      )
    }
  />
);

const createRoutes = store =>
  <Fragment>
    <Switch>
      {RouteList.map((route, index) =>
        <PrivateRoute key={index}
                      path={route.path}
                      exact
                      component={AsyncComponent(route.component(store))}/>
      )}
      <Route component={() => (<div>未找到页面 404</div>)} />
    </Switch>
  </Fragment>
;

export default createRoutes;
