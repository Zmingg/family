import {injectReducer} from '../../store/reducers';
import connectComponent from '../../store/connect';

const STATE_KEY = 'passport';

const Login = store => async () => {
  const component = (await import('./components/Login')).default;
  const handlers = (await import('./action')).default;
  // const reducer = createReducer(handlers);
  // const dispatchProps = createDispatchProps(handlers);

  injectReducer(store, {
    key: STATE_KEY,
    reducer: reducer
  });

  return connectComponent(
    state => state,
    dispatchProps
  )(component);

};

export default {
  Login,
};

