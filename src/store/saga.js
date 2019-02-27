import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Case from 'case';

const transEvent = (listener, stateKey) => {
  const eventType = Case.constant(listener.name)
  const successType = `${eventType}_SUCCEEDED`;
  const failType = `${eventType}_FAILED`;

  return {
    type: eventType,
    action: function* () {
      try {
        yield put({type: eventType, data: (state, payload) => auth(state[stateKey], payload)});
        yield put({type: successType});
      } catch (error) {
        yield put({type: failType, error});
      }
    }
  }
}

/**
 * 
 * @param {array} eventList 
 */
function* registryEvents(eventList = []) {
  eventList.map(event => function* () {
    const event = transEvent(event);
    yield takeLatest(event.type, event.action);
  })
    
}

export default registryEvents;