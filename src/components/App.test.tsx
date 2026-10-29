import { renderWithRedux } from '../utils/testUtils';
import type { InitialStateOption } from '../utils/testUtils';
import App from './App';
import { fireEvent } from '@testing-library/react';

export const initialState: InitialStateOption = {
  todos: {
    allTodos: [
      {
        id: '8cb34f79-aa9c-4a87-bc26-0b651af6eacb',
        name: 'test123',
        description: 'dawdawd',
        creationDate: '2020-02-25T22:49:54.466Z'
      }
    ]
  },
  recording: {
    isRecording: false,
    isPlaying: false,
    session: [
      {
        type: 'ADD_TODO',
        payload: {
          id: 'ed6a9487-f8d3-4d17-b90a-db656dc6ac38',
          name: 'awdawdaw',
          description: 'dawdawd',
          creationDate: '2020-02-25T21:54:16.569Z'
        }
      }
    ]
  }
};

it('can render with redux with defaults', () => {
  const { getByTestId, getByText } = renderWithRedux(<App />, { initialState });
  expect(getByTestId('todo-container')).toBeInTheDocument();
  expect(getByText('test123')).toBeTruthy();
});

it('removes a todo when "x" icon is pressed', () => {
  const { container, store } = renderWithRedux(<App />, { initialState });
  const { getState } = store;
  //will target and delete the only todo in the array: name:test123
  const deleteTodoBtn = container.querySelector('.delete-todo')!;
  fireEvent.click(deleteTodoBtn);
  expect(getState().todos.allTodos).toHaveLength(0);
});

test('edit todo', () => {
  const { container, store, getByText, getByTestId } = renderWithRedux(
    <App />,
    {
      initialState
    }
  );
  const { getState } = store;
  //will target and delete the only todo in the array: name:test123
  const editTodoBtn = container.querySelector('.edit-todo')!;
  fireEvent.click(editTodoBtn);
  expect(getByText('EDIT TODO')).toBeVisible();
  const todoName = getByTestId('name-input');
  fireEvent.change(todoName, { target: { value: 'updated' } });
  fireEvent.click(getByText('EDIT'));
  expect(getState().todos.allTodos[0].name).toBe('updated');
});
