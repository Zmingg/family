import React, {Component, Fragment} from 'react';
import {store} from '../../../store'

const debug = require('debug')('article');

export default class ArticleList extends Component {

  componentDidMount() {
    this.getPassportList();
  }

  getPassportList = async () => {
    const {Basic} = this.props.services;
    const res = await Basic.findPassports({
      pageIndex: 1,
      pageSize: 10
    });
  }

  render() {
    return (
      <Fragment>
        name:
      </Fragment>
    )
  }
}