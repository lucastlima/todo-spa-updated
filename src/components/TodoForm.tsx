import { useEffect, useRef } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';
import Button from './Button';

const StyledInput = styled.input`
  border: none;
  margin: 0.5rem 0;
  line-height: 2rem;
  padding: 0 0.5rem;
  box-shadow: var(--shadow-one);
  border-radius: 0.3rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  color: inherit;
  &::placeholder {
    font-size: 1rem;
    color: #aaa;
  }
`;

const StyledTextArea = styled.textarea`
  font-family: inherit;
  font-size: 1rem;
  height: 5rem;
  border: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  box-shadow: var(--shadow-one);
  border-radius: 0.3rem;
  resize: none;
  color: inherit;
  font-weight: 400;
  &::placeholder {
    font-size: 1rem;
    color: #aaa;
  }
`;

const StyledTodoForm = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  width: 30rem;
  max-width: 90vw;
  height: auto;
  background-color: var(--white);
  padding: 1rem;
  box-shadow: var(--shadow-tree);

  & #error {
    color: var(--error);
    font-size: 0.7rem;
    animation: todoIn 0.2s ease-in;
  }
`;

type TodoFormProps = {
  controlInput: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setModal: () => void;
  name?: string;
  desc?: string;
  title?: string;
  children?: ReactNode;
  isOpen?: boolean;
  error?: string | null;
};

function TodoForm({
  controlInput,
  setModal,
  name = '',
  desc = '',
  title = 'Form',
  children,
  isOpen = false,
  error = null
}: TodoFormProps) {
  const inputName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputName.current?.focus();
  }, [isOpen]);

  return (
    <StyledTodoForm>
      <h4>{title}</h4>
      <StyledInput
        ref={inputName}
        data-testid="name-input"
        autoComplete="off"
        onChange={controlInput}
        value={name}
        type="text"
        name="name"
        placeholder="Name"
      />
      {error ? <span id="error">{error}</span> : null}
      <StyledTextArea
        onChange={controlInput}
        name="description"
        value={desc}
        placeholder="Description..."
      />
      <div>
        {children}
        <Button onClick={setModal}>Cancel</Button>
      </div>
    </StyledTodoForm>
  );
}

export default TodoForm;
