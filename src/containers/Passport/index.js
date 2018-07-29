import {injectReducer} from '../../store/reducers';
import connectComponent from '../../store/connect';

const STATE_KEY = 'passport';

const Login = store => async () => {
  const component = (await import('./components/Login')).default;
  const dispatch = (await import('./action')).default;
  const reducer = (await import('./reducer')).default;


  injectReducer(store, {
    key: STATE_KEY,
    reducer: reducer
  });

  return connectComponent(
    state => state[STATE_KEY],
    dispatch
  )(component);

};

export default {
  Login,
};

