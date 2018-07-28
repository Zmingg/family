import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import Home from './containers/Home';
import Article from './containers/Article';
import {AsyncComponent} from 'components/asyncComponent';

const RouteList = [
  /** 首页 */
  { path: '/', component: Home},
  /** 文章 */
  { path: '/article', component: Article.ArticleList},
];

const createRoutes = store =>
  <Fragment>
    {RouteList.map((route, index) =>
      <Route key={index}
             path={route.path}
             exact
             component={AsyncComponent(route.component(store))}/>
    )}
  </Fragment>
;

export default createRoutes;
