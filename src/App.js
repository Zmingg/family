import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from './store'
import createRoutes from './routes';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './style/style.scss';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <LocaleProvider locale={zhCN}>
          {createRoutes(store)}
        </LocaleProvider>
      </Provider>
    )
  }
}