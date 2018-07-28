import React, {Component} from 'react';

export default class Home extends Component {

  render() {
    return (
      <div>
        您好，欢迎使用。（{new Date().toLocaleString()}）
      </div>
    )
  }
}