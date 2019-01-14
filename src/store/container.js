import Case from 'case';
import {connect} from 'react-redux';

const createActionListeners = actions => {
  const listeners = {};

  actions.map(key => {
    const type = Case.constant(key),
      handler = Case.camel('on-' + key),
      action = Case.camel(key);

    const listener = {
      type: type,
      handler: handler,
      action: action
    };

    listeners[key] = listener;
    return listener;
  });

  return listeners;
};

export class Container {
  constructor(injector) {
    this.injector = injector;
    this.listeners = {};
    this.reducer = null;
  }

  listen(actions) {
    const listeners = createActionListeners(actions);

    this.listeners = {
      ...this.listeners,
      ...listeners
    };

    return listeners;
  }


  /**
   * Creates a wrapped component
   *
   * @param component
   * @param options
   */
  createComponent(component, options) {
    const mapStateToProps = (state) => {
      const ret = {};

      // map state to props
      if (options.stateToProps) {
        options.stateToProps.forEach(item => {
          const type = typeof item;
          const subState = state[item];

          if (type === 'string') {
            if (/@.+/.test(item)) {
              // flatten state to props
              Object.keys(subState).forEach(key => {
                ret[key] = subState[key];
              });
            } else {
              ret[item] = subState;
            }
          } else {
            throw new Error(`'stateToProps' of createComponent must be array of strings,
             you may need 'props' options instead.`);
          }
        });
      }

      // and additional custom props...
      if (options.props) {
        Object.keys(options.props).forEach(key => {
          const subState = options.props[key];

          ret[key] = typeof subState === 'function' ? subState(state) : subState;
        });
      }

      return ret;
    };

    const listeners = this.listeners;
    const dispatcher = {}, namespaceDispatcher = {};
    const mapDispatchToProps = {};

    // merge dispatches
    if (options.dispatchToProps) {
      options.dispatchToProps.forEach(dispatch => {
        Object.assign(dispatcher, dispatch);
      });
    }

    Object.keys(listeners).forEach(key => {
      const listener = listeners[key];

      mapDispatchToProps[listener.action] = (...args) => {
        let ret;

        const action = dispatcher[listener.action];

        if (action) {
          ret = action.apply(null, args);
        } else {
          // return default action if no action found in listeners
          ret = {
            type: listener.type,
            payload: args
          };
        }

        return ret;
      };
    });

    const debug = require('debug')('services:api');
    debug(dispatcher);

    return connect(mapStateToProps, mapDispatchToProps)(component);
  }

  /**
   *
   * @param initialState
   * @param handlers
   * @param chain
   * @returns {function(*=, *=)}
   */
  createReducer(initialState, handlers, chain = []) {
    // create reducer
    return this.reducer = (state = initialState, action) => {
      // let reducer = handlersTypeMap[action.type];
      let reducer = handlers[action.type], newState = state;

      // lookup reducer in chain if no reducer specified
      if (reducer) {
        newState = reducer(state, action);
      } else {
        const list = Array.isArray(chain) ? chain : [chain];

        for (let i = 0; !reducer && i < list.length; i++) {
          const fn = list[i];

          if (typeof fn === 'function') {
            newState = fn(newState, action);
          }
        }
      }

      return newState;
    };
  }

  connectStore(store, key) {
    if (this.injector) {
      this.injector(store, {
        key: key,
        reducer: this.reducer
      });
    } else {
      throw new Error('No injector specified, failed to connect to store \'' + key + '\'.');
    }
  }
}
