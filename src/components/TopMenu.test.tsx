import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../utils/testUtils';
import type { InitialStateOption } from '../utils/testUtils';
import TopMenu from './TopMenu';

export const initialState: InitialStateOption = {
  todos: {
    allTodos: []
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

beforeEach(cleanup);

describe('Test add button', () => {
  it('Opens modal on click "+" ', () => {
    const { getByText } = renderWithRedux(<TopMenu />);
    fireEvent.click(getByText('+'));
    expect(getByText('ADD TODO')).toBeVisible();
  });

  it('add a new todo on click the ADD button', async () => {
    const { getByText, getByTestId, store } = renderWithRedux(<TopMenu />, {
      initialState
    });
    const { getState } = store;
    fireEvent.click(getByText('+'));
    const todoName = getByTestId('name-input');
    fireEvent.change(todoName, { target: { value: 'test' } });
    fireEvent.click(getByText('ADD'));
    expect(getState().todos.allTodos).toHaveLength(1);
    expect(getState().todos.allTodos[0].name).toBe('test');
  });
});

describe('Test recording buttons', () => {
  it('Starts recording the session - rec button', async () => {
    const { store, container, getByText, getByTestId } = renderWithRedux(
      <TopMenu />,
      {
        initialState
      }
    );
    const { getState } = store;
    const recBtn = container.querySelector('#rec')!.firstChild!;
    fireEvent.click(recBtn);
    expect(getState().recording.isRecording).toBeTruthy();
    fireEvent.click(getByText('+'));
    const todoName = getByTestId('name-input');
    fireEvent.change(todoName, { target: { value: 'record123' } });
    fireEvent.click(getByText('ADD'));
    // Rec button overrites any previous recorded sections
    expect(getState().recording.session).toHaveLength(1);
    const recordedAction = getState().recording.session[0];
    if (recordedAction.type === 'ADD_TODO') {
      expect(recordedAction.payload.name).toBe('record123');
    }

    // Clicking rec again while already recording should not wipe the active session
    fireEvent.click(recBtn);
    expect(getState().recording.session).toHaveLength(1);
  });

  it('Stops recording the session - stop button', () => {
    const { store, container } = renderWithRedux(<TopMenu />, {
      initialState: {
        recording: {
          isRecording: true
        }
      }
    });
    const { getState } = store;
    const stopBtn = container.querySelector('#stop')!.firstChild!;
    fireEvent.click(stopBtn);
    expect(getState().recording.isRecording).toBeFalsy();
  });

  it('Starts playing the session - play button', async () => {
    const { store, container } = renderWithRedux(<TopMenu />, {
      initialState
    });
    //window.alert = jest.fn();
    const { getState } = store;
    const playBtn = container.querySelector('#play')!.firstChild!;
    fireEvent.click(playBtn);
    expect(getState().recording.isPlaying).toBeTruthy();
    await waitFor(
      () => {
        expect(getState().todos.allTodos).toHaveLength(1);
      },
      { timeout: 2500 }
    );
  });
  it('Deletes recorded session', () => {
    const { store, container } = renderWithRedux(<TopMenu />, {
      initialState
    });
    const { getState } = store;
    const deleteBtn = container.querySelector('#deleteRec')!.firstChild!;
    fireEvent.click(deleteBtn);
    expect(getState().recording.session).toHaveLength(0);
  });

  it('Renders hover tooltips for control and add buttons', () => {
    const { container, getByText } = renderWithRedux(<TopMenu />, {
      initialState
    });
    const expectedTooltips: Array<[Element | null, string]> = [
      [container.querySelector('#rec'), 'Record actions'],
      [container.querySelector('#stop'), 'Stop recording'],
      [container.querySelector('#play'), 'Replay recorded session'],
      [container.querySelector('#deleteRec'), 'Clear recorded session'],
      [getByText('+'), 'Add new todo']
    ];

    expectedTooltips.forEach(([trigger, text]) => {
      expect(trigger).not.toBeNull();
      const targetId = trigger!.getAttribute('interestfor');
      expect(targetId).toBeTruthy();
      const popover = container.querySelector(`#${targetId}`);
      expect(popover).not.toBeNull();
      expect(popover).toHaveAttribute('popover', 'hint');
      expect(popover).toHaveTextContent(text);
    });
  });
});
