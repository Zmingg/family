import Services from './services';
import debug from 'debug';

export default class ApiClient {

  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }
    ApiClient.instance = this.createServices(Services);
    return ApiClient.instance;
  }

  createServices(services) {
    const map = {}
    Object.keys(services).map(key => {
      const service = services[key];
      map[key] = this.createService(service);
    });
    return map;
  }

  createService(service) {
    debug('services')(service);
    const {api, domain} = service;
    const instance = new api(domain);
    const prototype = Object.getPrototypeOf(instance)
    Object.getOwnPropertyNames(prototype).map(key => {
      instance[key] = prototype[key];
    });
    return instance;
  }


}