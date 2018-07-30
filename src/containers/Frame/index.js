import {injectReducer} from '../../store/reducers';
import connectComponent from '../../store/connect';

const STATE_KEY = 'frame';

const Frame = store => async () => {
  const component = (await import('./components/Frame')).default;
  const dispatch = (await import('./action')).default;
  const reducer = (await import('./reducer')).default;


  injectReducer(store, {
    key: STATE_KEY,
    reducer: reducer
  });

  return connectComponent(
    state => ({
      [STATE_KEY]: state[STATE_KEY],
      passport: state['passport']
    }), dispatch
  )(component);

};

export default Frame;

