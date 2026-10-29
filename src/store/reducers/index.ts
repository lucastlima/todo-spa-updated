import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import todosReducer from './todos.reducer';
import recordingReducer from './recording.reducer';
import type { AppAction, RootState } from '../types';

const rootReducer = combineReducers({
  todos: todosReducer,
  recording: recordingReducer
}) as Reducer<RootState, AppAction, Partial<RootState>>;

export default rootReducer;
