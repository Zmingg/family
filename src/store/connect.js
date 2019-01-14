import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {injectReducer} from './reducers';
import _ from 'lodash';
import Case from 'case';

const INITIAL_STATE_KEYS = ['services'];

const createReducer = (handlers) => {
  const handlerKeys = Object.keys(handlers);

  return (state = {}, action) => {
    const {type, payload} = action
    const handlerKey = Case.camel(type);
    if (_.includes(handlerKeys, handlerKey)) {
      return handlers[handlerKey](state, payload);
    } else {
      return state;
    }
  }
};

const createDispatchProps = (handlers) => {
  const handlerKeys = Object.keys(handlers);
  const dispatchers = {};
  handlerKeys.map(handlerKey => {
    dispatchers[handlerKey] = payload => ({
      type: Case.constant(handlerKey),
      payload
    })
  })

  return dispatch => bindActionCreators(dispatchers, dispatch);
};

/**
 * connectComponent
 * 
 * @param {*} stateKeys 
 * @param {*} handlers 
 */
const connectComponent = (stateKeys, handlers) => {
  const reducer = createReducer(handlers);
  const mapDispatchToProps = createDispatchProps(handlers);
  const mapStateToProps = state => {
    const stateProps = {};
    stateKeys = [...stateKeys, ...INITIAL_STATE_KEYS];

    stateKeys.map(key => {
      stateProps[key] = state[key]
    });
    return stateProps;
  };

  return (component, store, stateKey) => {
    if (stateKey) {
      injectReducer(store, {
        key: stateKey,
        reducer: reducer
      });
    }

    return connect(mapStateToProps, mapDispatchToProps)(component)
  };
}

export default connectComponent;
