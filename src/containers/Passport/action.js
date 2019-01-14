export default {

  auth (state, payload) {
    return {
      ...state,
      auth: true,
      token: payload
    };
  }

}

