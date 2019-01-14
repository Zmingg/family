import connectComponent from '../../store/connect';

const Home = store => async () => {
  const component = (await import('./components/index')).default;
  const stateKeys = [];

  return connectComponent(stateKeys, {})(component, store, null);
};

export default {
  Home,
};