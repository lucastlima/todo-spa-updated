import { useState, memo } from 'react';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store';
import {
  removeTodo,
  selectTodo,
  editTodo,
  setDialogBox
} from '../store/actions';
import Button from './Button';

import Todo from './Todo';
import Modal from './Modal';
import TodoForm from './TodoForm';
import Layout from './Layout';
import DialogBox from './DialogBox';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  color: white;
  padding: 1rem;
  overflow-y: auto;
`;

function WrappedApp() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(({ todos }) => todos.allTodos);
  const selected = useAppSelector(({ todos }) => todos.selectedTodo);
  const dialogBox = useAppSelector(({ todos }) => todos.dialogBox);
  const [todoName, setTodoName] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.target.name === 'name') {
      setTodoName(e.target.value);
    } else {
      setTodoDesc(e.target.value);
    }
  }

  const closeDialogBox = () => {
    dispatch(setDialogBox(null));
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = (id: string) => {
    dispatch(removeTodo(id));
  };
  const handleTodoSelection = (id: string) => {
    const todo = todos.find(item => item.id === id);
    if (todo) {
      setTodoName(todo.name);
      setTodoDesc(todo.description);
    }
    dispatch(selectTodo(id));
    handleModal();
  };

  const handleEditTodo = () => {
    if (!todoName) {
      setError('Name is required.');
      setTimeout(() => {
        setError(null);
      }, 1500);
      return;
    }
    if (!selected) return;
    const newTodo = {
      ...selected,
      name: todoName,
      description: todoDesc
    };

    dispatch(editTodo(newTodo));
    handleModal();
  };

  return (
    <Layout>
      <StyledApp data-testid="todo-container">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            {...todo}
            editTodo={handleTodoSelection}
            deleteTodo={handleDelete}
          />
        ))}
      </StyledApp>
      {isModalOpen ? (
        <Modal close={handleModal} open={isModalOpen}>
          <TodoForm
            title="EDIT TODO"
            error={error}
            isOpen={isModalOpen}
            setModal={handleModal}
            controlInput={handleInput}
            name={todoName}
            desc={todoDesc}
          >
            <Button colorProp="#f7ab1b" onClick={handleEditTodo}>
              EDIT
            </Button>
          </TodoForm>
        </Modal>
      ) : null}
      {dialogBox ? (
        <Modal close={closeDialogBox} open={Boolean(dialogBox)}>
          <DialogBox
            title={dialogBox.title}
            message={dialogBox.message}
            close={closeDialogBox}
          />
        </Modal>
      ) : null}
    </Layout>
  );
}

const App = memo(WrappedApp);

export default App;
