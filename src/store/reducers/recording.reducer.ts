import {
  START_RECORDING,
  STOP_RECORDING,
  START_SESSION_REPLAY,
  END_SESSION_REPLAY,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  DELETE_RECORDED_SESSION
} from '../actiontypes';
import type { Reducer } from 'redux';
import type { AppAction, RecordingState } from '../types';

const initialState: RecordingState = {
  isRecording: false,
  isPlaying: false,
  session: []
};

const recordingReducer: Reducer<RecordingState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case START_RECORDING:
      if (state.isRecording) return state;
      return { ...state, isRecording: true, session: [] };
    case STOP_RECORDING:
      return { ...state, isRecording: false };
    case START_SESSION_REPLAY:
      return { ...state, isRecording: false, isPlaying: true };
    case END_SESSION_REPLAY:
      return { ...state, isPlaying: false };
    case DELETE_RECORDED_SESSION:
      return { ...state, session: [], isRecording: false };
    case ADD_TODO:
      return state.isRecording
        ? {
            ...state,
            session: [...state.session, { type: action.type, payload: action.payload }]
          }
        : state;
    case REMOVE_TODO:
      return state.isRecording
        ? {
            ...state,
            session: [...state.session, { type: action.type, payload: action.payload }]
          }
        : state;
    case UPDATE_TODO:
      return state.isRecording
        ? {
            ...state,
            session: [...state.session, { type: action.type, payload: action.payload }]
          }
        : state;
    default:
      return state;
  }
};

export default recordingReducer;
