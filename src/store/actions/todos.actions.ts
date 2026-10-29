import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SELECT_TODO,
  SET_DIALOGBOX
} from '../actiontypes';
import type { AppThunk } from '../index';
import type { DialogMessage, TodoItem } from '../types';

export const addTodo =
  (todo: TodoItem): AppThunk =>
  (dispatch, getState) => {
    dispatch({ type: ADD_TODO, payload: todo });
    localStorage.setItem('todo-spa', JSON.stringify(getState()));
  };

export const selectTodo =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    const todos = getState().todos.allTodos;
    const todo = todos.find(todo => todo.id === id) || null;
    dispatch({ type: SELECT_TODO, payload: todo });
  };

export const removeTodo =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    const isRecording = getState().recording.isRecording;
    const session = getState().recording.session;
    const todos = getState().todos.allTodos;
    if (isRecording) {
      const isValid = session.find(
        action => action.type === 'ADD_TODO' && action.payload.id === id
      );
      if (!isValid) {
        dispatch(
          setDialogBox({
            title: 'Alert',
            message:
              'This session has no target for this action. Please add Todo to the recording session before Editing or Removing it.'
          })
        );
        return;
      }
    }
    const newTodos = todos.filter(todo => todo.id !== id);
    dispatch({
      type: REMOVE_TODO,
      payload: { todos: newTodos, id }
    });
    localStorage.setItem('todo-spa', JSON.stringify(getState()));
  };

export const editTodo =
  (todo: TodoItem): AppThunk =>
  (dispatch, getState) => {
    const isRecording = getState().recording.isRecording;
    const session = getState().recording.session;

    if (isRecording) {
      const isValid = session.find(
        action => action.type === 'ADD_TODO' && action.payload.id === todo.id
      );
      if (!isValid) {
        dispatch(
          setDialogBox({
            title: 'Alert',
            message:
              'This session has no target for this action. Please add Todo to the recording session before Editing or Removing it.'
          })
        );
        return;
      }
    }
    dispatch({ type: UPDATE_TODO, payload: todo });
    localStorage.setItem('todo-spa', JSON.stringify(getState()));
  };

export const setDialogBox =
  (message: DialogMessage | null): AppThunk =>
  (dispatch, getState) => {
    dispatch({
      type: SET_DIALOGBOX,
      payload: message
    });
    localStorage.setItem('todo-spa', JSON.stringify(getState()));
  };
