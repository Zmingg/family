import React, {Component, Fragment} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import MainFrame from './containers/Frame';
import Home from './containers/Home';
import Passport from './containers/Passport';
import Article from './containers/Article';
import {AsyncComponent} from 'components/asyncComponent';

const RouteList = [
  /** 首页 */
  { path: '/', component: Home.Home},
  /** 文章 */
  { path: '/article', component: Article.ArticleList},
];

const auth = {
  isAuthenticated: false,
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
        <MainFrame>
          <Component {...props}/>
        </MainFrame>
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
  <Router basename='/'>
    <Switch>
      {/* 登陆 */}
      <Route path='/passport/login' component={AsyncComponent(Passport.Login(store))} exact/>
      {/* 主路由 */}
      {RouteList.map((route, index) =>
        <PrivateRoute key={index}
                      path={route.path}
                      exact
                      component={AsyncComponent(route.component(store))}/>
      )}
      {/* 404 */}
      <Route component={() => (<div>404 未找到页面</div>)} exact/>
    </Switch>
  </Router>
;

export default createRoutes;
