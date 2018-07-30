import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Menu, Icon} from 'antd';
import './style.scss';

const SubMenu = Menu.SubMenu;

export default withRouter(class extends Component {

  rootSubmenuKeys = ['home', 'article', 'media'];

  state = {
    openKeys: ['article'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  route = (route) => {
    this.props.history.push(route === 'home' ? '/' : '/' + route)
  };

  render() {
    return (
      <Menu
        mode='inline'
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        className='menu-list'
        onClick={({key}) => this.route(key)}
      >
        <Menu.Item key='home'>
          <span><Icon type='tag-o' /><span>Home</span></span>
        </Menu.Item>
        <SubMenu key='article' title={<span><Icon type='tag-o' /><span>Article</span></span>}>
          <Menu.Item key='article'>Article List</Menu.Item>
        </SubMenu>
        <SubMenu key='media' title={<span><Icon type='tag-o' /><span>Media</span></span>}>
          <Menu.Item key='audio'>Audio List</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
});