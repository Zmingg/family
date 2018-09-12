import React, {Component, Fragment} from 'react';

const debug = require('debug')('article');

export default class ArticleList extends Component {

  componentDidMount() {
    debug(this.props);
    this.props.fetchUser();
  }

  render() {
    return (
      <Fragment>
        name:
      </Fragment>
    )
  }
}