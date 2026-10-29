import {
  START_RECORDING,
  STOP_RECORDING,
  START_SESSION_REPLAY,
  DELETE_RECORDED_SESSION,
  END_SESSION_REPLAY,
  RESET_APP_STATE
} from '../actiontypes';
import { setDialogBox } from '../actions';
import type { AppThunk } from '../index';
import type { AddTodoAction, TodoItem } from '../types';

export const startRecording = (): AppThunk => (dispatch, getState) => {
  dispatch({ type: START_RECORDING });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const stopRecording = (): AppThunk => (dispatch, getState) => {
  dispatch({ type: STOP_RECORDING });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const deleteRecordingSession = (): AppThunk => (dispatch, getState) => {
  dispatch({ type: DELETE_RECORDED_SESSION });
  localStorage.setItem('todo-spa', JSON.stringify(getState()));
};

export const playRecordingSession =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    dispatch({ type: START_SESSION_REPLAY });
    const session = getState().recording.session;
    let counter = 0;
    const runTimeLine = () =>
      new Promise<void>((res, rej) => {
        let timeline: ReturnType<typeof setInterval> | undefined;
        try {
          if (session.length) {
            dispatch({ type: RESET_APP_STATE });

            const highlightFunc = (id: string) => {
              const todo = document.getElementById(`${id}`);
              if (!todo) return;
              todo.classList.add('highlight');
              setTimeout(() => {
                todo.classList.remove('highlight');
              }, 1000);
            };

            timeline = setInterval(() => {
              if (counter < session.length) {
                const currentAction = session[counter];
                if (currentAction.type === 'UPDATE_TODO') {
                  const id = currentAction.payload.id;
                  highlightFunc(id);
                }
                if (currentAction.type === 'REMOVE_TODO') {
                  const validTodos = session.filter(
                    (todo): todo is AddTodoAction => todo.type === 'ADD_TODO'
                  );
                  const sessionTodos: TodoItem[] = [];
                  currentAction.payload.todos.forEach(todo => {
                    if (
                      validTodos.find(({ payload }) => payload.id === todo.id)
                    ) {
                      sessionTodos.push(todo);
                    }
                  });
                  currentAction.payload.todos = sessionTodos;
                }

                dispatch(currentAction);
                counter++;
              } else {
                clearInterval(timeline);
                res();
              }
            }, 1000);
          } else {
            dispatch(
              setDialogBox({
                title: 'Message:',
                message: 'No sessions found. Please record a session first.'
              })
            );
            res();
          }
        } catch (error) {
          rej();
          console.log(error);
          clearInterval(timeline);
        }
      });
    await runTimeLine();
    dispatch({ type: END_SESSION_REPLAY });
    localStorage.setItem('todo-spa', JSON.stringify(getState()));
  };
