import React, {Component, Fragment} from 'react';
import MenuList from './Menu/Menu';
import './index.scss';

export default class Frame extends Component {

  render() {
    return (
      <Fragment>
        <header/>
        <main>
          <div className='container'>
          {this.props.children}
          </div>
        </main>
        <aside>
          <MenuList/>
        </aside>
      </Fragment>
    );
  }
}