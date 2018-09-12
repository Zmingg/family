import fetch from 'cross-fetch'

class User {

  static domain = 'http://zmingg.cc/api';

  /**
   * 获取所有用户
   */
  getUsers() {
    return new Promise((resolve, reject) => {
      fetch(User.domain + '/users').then(res => res.json()).then(json =>{
        resolve(json['error'] ? json['error'] : json['data']);
      })
    })
  }
}

export default new User();