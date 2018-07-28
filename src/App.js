import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'
import createRoutes from './routes';
import MainFrame from './containers/Frame';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './style/style.scss';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={zhCN}>
          <Router basename='/'>
            <MainFrame>
              {createRoutes(store)}
            </MainFrame>
          </Router>
        </LocaleProvider>
      </Provider>
    )
  }
}