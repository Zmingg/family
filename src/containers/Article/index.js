import {injectReducer} from '../../store/reducers';
import connectComponent from '../../store/connect';

const STATE_KEY = 'article';

const ArticleList = store => async () => {
  const component = (await import('./components/ArticleList')).default;
  const dispatch = (await import('./action')).default;
  const reducer = (await import('./reducer')).default;


  injectReducer(store, {
    key: STATE_KEY,
    reducer: reducer
  });

  return connectComponent(
    state => state,
    dispatch
  )(component);

};

export default {
  ArticleList,
};

