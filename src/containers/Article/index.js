import {injectReducer} from '../../store/reducers';
import connectComponent from '../../store/connect';

const STATE_KEY = 'article';


const ArticleList = (store) => async () => {
  const component = (await import('./components/ArticleList')).default;
  const reducer = (await import('./reducer')).default;

  injectReducer(store, {
    key: STATE_KEY,
    reducer: reducer
  });

  connectComponent(
    state => state,
    dispatch => {
      return {}
    }
  )(component);

};

export default {
  ArticleList,
};

