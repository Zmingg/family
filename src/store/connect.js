import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {injectReducer} from './reducers';
import _ from 'lodash';
import Case from 'case';

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
}

const createDispatchProps = (handlers) => {
  const handlerKeys = Object.keys(handlers);
  const dispatchs = {};
  handlerKeys.map(handlerKey => {
    dispatchs[handlerKey] = payload => ({
      type: Case.constant(handlerKey),
      payload
    })
  })

  return dispatch => bindActionCreators(dispatchs, dispatch);
}

export default connectComponent = (stateKeys, handlers) => {
  const reducer = createReducer(handlers);
  const mapDispatchToProps = createDispatchProps(handlers);
  const mapStateToProps = state => stateKeys.map(key => state[key]);

  injectReducer(store, {
    key: STATE_KEY,
    reducer: reducer
  });
  

  return component => connect(mapStateToProps, mapDispatchToProps)(component);
}
