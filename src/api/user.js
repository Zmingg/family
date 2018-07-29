import fetch from 'cross-fetch';
import queryString from 'query-string';

class User {

  static domain = 'http://localhost:8793/api';

  /**
   * Request
   * @param path
   * @param parameters
   * @return {Promise}
   */
  request(path, parameters = {}) {

    const reqParameters = {method: 'get'};

    if (parameters.method) {
      reqParameters.method = parameters.method;
    }

    if (parameters.query) {
      path += '?' + queryString.stringify(parameters.query);
    }

    if (parameters.params) {
      const body = new FormData();
      Object.keys(parameters.params).forEach(key => {
        body.append(key, parameters.params[key]);
      });
      reqParameters.body = body;
    }

    if (parameters.headers) {
      const headers = new Headers();
      Object.keys(parameters.headers).forEach(key => {
        headers.append(key, parameters.headers[key]);
      });
      reqParameters.headers = headers;
    }

    return new Promise((resolve, reject) => {
      fetch(User.domain + path, reqParameters).then(res => res.json()).then(json => {
        resolve(json['error'] ? json['error'] : json['data']);
      }).catch(e => {
        reject(e);
      })
    })
  }

  /**
   * 获取所有用户
   */
  getUsers() {
    return this.request('/users');
  }

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return this.request('/user-info', {
      headers: {
        token: 'ancdanfkjanefg'
      }
    })
  }

  checkAuth({user, pass}) {
    return this.request('/login', {
      method: 'post',
      params: {
        user, pass
      }
    })
  }


}

export default new User();