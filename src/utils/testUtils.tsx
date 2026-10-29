import type { ReactElement } from 'react';
import rootReducer from '../store/reducers';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { render } from '@testing-library/react';
import { thunk } from 'redux-thunk';
import type { AppDispatch } from '../store';
import type { RecordingState, RootState, TodosState } from '../store/types';

export type InitialStateOption = {
  todos?: Partial<TodosState>;
  recording?: Partial<RecordingState>;
};

const buildPreloadedState = (
  initialState?: InitialStateOption
): Partial<RootState> | undefined => {
  if (!initialState) return undefined;
  return {
    ...(initialState.todos
      ? {
          todos: {
            allTodos: [],
            selectedTodo: null,
            dialogBox: null,
            ...initialState.todos
          }
        }
      : {}),
    ...(initialState.recording
      ? {
          recording: {
            isRecording: false,
            isPlaying: false,
            session: [],
            ...initialState.recording
          }
        }
      : {})
  };
};

export function renderWithRedux(
  ui: ReactElement,
  {
    initialState,
    store = createStore(
      rootReducer,
      buildPreloadedState(initialState),
      composeWithDevTools(applyMiddleware<AppDispatch, RootState>(thunk))
    )
  }: {
    initialState?: InitialStateOption;
    store?: Store<RootState, any>;
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}
