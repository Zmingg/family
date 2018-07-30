import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {store, persistor} from './store'
import {PersistGate} from 'redux-persist/integration/react'
import createRoutes from './routes';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './style/style.scss';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocaleProvider locale={zhCN}>
            {createRoutes(store)}
          </LocaleProvider>
        </PersistGate>
      </Provider>
    )
  }
}