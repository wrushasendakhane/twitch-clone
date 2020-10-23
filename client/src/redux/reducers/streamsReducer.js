
import StreamsTypes from '../types/StreamsTypes';
import _ from "lodash"
const INITIAL_STATE = {
}

const streamsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case StreamsTypes.CREATE_STREAM:
    case StreamsTypes.FETCH_STREAM:
    case StreamsTypes.UPDATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case StreamsTypes.FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case StreamsTypes.DELETE_STREAM:
      return _.omit(state, action.payload)
    default:
      return state;
  }
}

export default streamsReducer;