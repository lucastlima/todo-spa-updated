import styled from 'styled-components';
import { MdCancel as Delete, MdCreate as Edit } from 'react-icons/md';
import { handleDate } from '../utils/utils';
import type { TodoItem } from '../store/types';
import Tooltip from './Tooltip';

const StyledTodo = styled.div`
  display: flex;
  flex-direction: column;
  height: min-content;
  min-height: 7rem;
  max-height: 8rem;
  width: 100%;
  background-color: var(--white);
  box-shadow: var(--shadow-two);
  margin-bottom: 0.6rem;
  color: var(--dark-blue);
  padding: 1rem;
  overflow: hidden;
  border-radius: 0.3rem;
  animation: todoIn 0.2s ease-in;

  &:hover {
    max-height: 100%;
  }

  & p {
    overflow-wrap: break-word;
    overflow-y: auto;
    color: #a7b1b8;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & .header {
    display: flex;
    justify-content: space-between;
  }

  .todo-actions {
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
  }

  .edit-todo,
  .delete-todo {
    font-size: 1.2rem;
    color: #a7b1b8;
    cursor: pointer;
    transition: color 0.1s ease-in;
    will-change: color;

    &:hover {
      color: var(--dark-blue);
    }
  }

  .todo-desc {
    display: flex;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .todo-date {
    font-size: 0.7rem;
    text-align: right;
    padding-top: 0.5rem;
  }
`;

type TodoProps = TodoItem & {
  editTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

function Todo({
  id,
  name,
  description,
  editTodo,
  deleteTodo,
  creationDate
}: TodoProps) {
  const { month, day, hour, min, sec } = handleDate(creationDate);
  return (
    <StyledTodo id={id}>
      <div className="header">
        <h4>{name}</h4>
        <span className="todo-actions">
          <Tooltip
            className="edit-todo"
            label="Edit todo"
            onClick={() => editTodo(id)}
          >
            <Edit />
          </Tooltip>
          <Tooltip
            className="delete-todo"
            label="Delete todo"
            onClick={() => deleteTodo(id)}
          >
            <Delete />
          </Tooltip>
        </span>
      </div>
      <div className="todo-desc">
        <p>{description}</p>
      </div>
      <span className="todo-date">{`${month}, ${day} at ${hour}:${min}:${sec}`}</span>
    </StyledTodo>
  );
}

export default Todo;
