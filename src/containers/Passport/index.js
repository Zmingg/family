import connectComponent from '../../store/connect';

const STATE_KEY = 'passport';

const Login = store => async () => {
  const component = (await import('./components/Login')).default;
  const handlers = (await import('./action')).default;
  const stateKeys = [STATE_KEY];

  return connectComponent(stateKeys, handlers)(component, store, STATE_KEY);
};

export default {
  Login,
};

