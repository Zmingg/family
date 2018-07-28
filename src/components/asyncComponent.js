import React, {Component} from 'react';

/**
 * 异步组件
 *
 * @param loadComponent
 */
export const AsyncComponent = (loadComponent) => class extends Component {

  mount = true;

  constructor(props) {
    super(props);

    this.state = {
      component: null
    }
  }

  componentWillUnmount() {
    this.mount = false
  }

  async componentDidMount() {
    const component = await loadComponent();

    if(!this.mount) return;

    this.setState({
      component: component
    })
  }

  render() {
    const C = this.state.component;

    return (
      C ? <C {...this.props}/> : null
    )
  }

};
