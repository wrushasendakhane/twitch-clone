import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import authReducer from './authReducer';
import streamsReducer from './streamsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamsReducer
})

export default rootReducer