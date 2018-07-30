import React, {Component, Fragment} from 'react';
import store from '../../../store'

export default class ArticleList extends Component {

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props;
    console.log(store.getState())

    return (
      <Fragment>
        name: {users.map(user => user['nickname'])}
      </Fragment>
    )
  }
}