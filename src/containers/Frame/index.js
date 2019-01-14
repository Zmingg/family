import connectComponent from '../../store/connect';

const STATE_KEY = 'frame';

const Frame = store => async () => {
  const component = (await import('./components/Frame')).default;
  const handlers = (await import('./action')).default;
  const stateKeys = [STATE_KEY];

  return connectComponent(stateKeys, handlers)(component, store, STATE_KEY);
};


export default Frame;

