import React, {Component, Fragment} from 'react';

export default class ArticleList extends Component {

  componentDidMount() {
    console.log(this.props)
    this.props.fetchPosts();

  }

  render() {
    const {posts} = this.props;

    return (
      <Fragment>
        name:
        {posts}
      </Fragment>
    )
  }
}