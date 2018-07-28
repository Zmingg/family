import React, {Component, Fragment} from 'react';

export default class ArticleList extends Component {

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props;

    return (
      <Fragment>
        name: {users.map(user => user.name)}
      </Fragment>
    )
  }
}