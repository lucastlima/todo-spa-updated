import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SELECT_TODO,
  SET_DIALOGBOX,
  START_RECORDING,
  STOP_RECORDING,
  START_SESSION_REPLAY,
  END_SESSION_REPLAY,
  RESET_APP_STATE,
  DELETE_RECORDED_SESSION
} from './actiontypes';

export type TodoItem = {
  id: string;
  name: string;
  description: string;
  creationDate: Date | string;
};

export type DialogMessage = {
  title?: string;
  message?: string;
};

export type TodosState = {
  allTodos: TodoItem[];
  selectedTodo: TodoItem | null;
  dialogBox: DialogMessage | null;
};

export type AddTodoAction = {
  type: typeof ADD_TODO;
  payload: TodoItem;
};

export type RemoveTodoAction = {
  type: typeof REMOVE_TODO;
  payload: {
    todos: TodoItem[];
    id: string;
  };
};

export type UpdateTodoAction = {
  type: typeof UPDATE_TODO;
  payload: TodoItem;
};

export type RecordedAction =
  | AddTodoAction
  | RemoveTodoAction
  | UpdateTodoAction;

export type SelectTodoAction = {
  type: typeof SELECT_TODO;
  payload: TodoItem | null;
};

export type SetDialogBoxAction = {
  type: typeof SET_DIALOGBOX;
  payload: DialogMessage | null;
};

export type StartRecordingAction = {
  type: typeof START_RECORDING;
};

export type StopRecordingAction = {
  type: typeof STOP_RECORDING;
};

export type StartSessionReplayAction = {
  type: typeof START_SESSION_REPLAY;
};

export type EndSessionReplayAction = {
  type: typeof END_SESSION_REPLAY;
};

export type ResetAppStateAction = {
  type: typeof RESET_APP_STATE;
};

export type DeleteRecordedSessionAction = {
  type: typeof DELETE_RECORDED_SESSION;
};

export type AppAction =
  | RecordedAction
  | SelectTodoAction
  | SetDialogBoxAction
  | StartRecordingAction
  | StopRecordingAction
  | StartSessionReplayAction
  | EndSessionReplayAction
  | ResetAppStateAction
  | DeleteRecordedSessionAction;

export type RecordingState = {
  isRecording: boolean;
  isPlaying: boolean;
  session: RecordedAction[];
};

export type RootState = {
  todos: TodosState;
  recording: RecordingState;
};
