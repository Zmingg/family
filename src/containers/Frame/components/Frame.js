import React, {Component, Fragment} from 'react';
import MenuList from './Menu';
import './style.scss';

export default class Frame extends Component {

  componentDidMount() {
    console.log(this.props)
  }

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