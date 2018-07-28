import connectComponent from '../../store/connect';

const Home = store => async () => {
  const component = (await import('./components/index')).default;

  return connectComponent(
    state => state,
    null
  )(component);

};

export default {
  Home,
};