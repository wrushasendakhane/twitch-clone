import streams from "../../apis/streams"
import StreamsTypes from '../types/StreamsTypes';
import history from "../../history"

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth
  const { data } = await streams.post("/streams", { ...formValues, userId: userId });
  dispatch({
    type: StreamsTypes.CREATE_STREAM,
    payload: data
  })
  history.push("/")
}

export const fetchStreams = () => async dispatch => {
  const { data } = await streams.get("/streams");
  dispatch({
    type: StreamsTypes.FETCH_STREAMS,
    payload: data
  })
}


export const fetchStream = (id) => async dispatch => {
  const { data } = await streams.get(`/streams/${id}`);
  dispatch({
    type: StreamsTypes.FETCH_STREAM,
    payload: data
  })
}

export const updateStream = (id, formValues) => async dispatch => {
  const { data } = await streams.patch(`/streams/${id}`, formValues)
  dispatch({
    type: StreamsTypes.UPDATE_STREAM,
    payload: data
  })
  history.push("/")
}

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: StreamsTypes.DELETE_STREAM,
    payload: id
  })
  history.push("/")
}