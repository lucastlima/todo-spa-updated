import { useState, memo } from 'react';
import type { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store';
import {
  addTodo,
  startRecording,
  stopRecording,
  deleteRecordingSession,
  playRecordingSession
} from '../store/actions';
import { v4 as uuid } from 'uuid';
import {
  MdFiberManualRecord as RecBtn,
  MdPlayArrow as PlayBtn,
  MdStop as StopBtn,
  MdDeleteSweep as DeleteBtn
} from 'react-icons/md';
import TodoForm from './TodoForm';
import Container from './Container';
import Modal from './Modal';
import Button from './Button';
import Tooltip from './Tooltip';

const SyledTopMenu = styled.div`
  display: flex;
  height: 4rem;
  z-index: 1;
  flex-direction: column;
  background-color: var(--white);
  padding: 0.5rem 1rem;
  justify-content: center;
  color: var(--dark-blue);
  box-shadow: var(--shadow-two);
`;

const StyledAddTodoBtn = styled(Tooltip)`
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 1;
  color: var(--dark-blue);

  &:hover {
    transform: scale(1.08);
    text-shadow: var(--shadow-one);
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const RecordControl = styled.div<{
  $isRecording: boolean;
  $isPlaying: boolean;
}>`
  display: flex;
  justify-content: space-around;
  align-items: center;

  & svg {
    cursor: pointer;
    height: 100%;
    width: 100%;
  }

  & #deleteRec,
  #play,
  #stop,
  #rec {
    width: 1.8rem;
    height: 1.5rem;
  }

  & #deleteRec {
    margin-left: 1rem;
    padding: 1.4px;
  }
  & #play {
    color: ${({ $isPlaying }) => ($isPlaying ? 'green' : 'inherit')};
  }
  & #rec {
    color: ${({ $isRecording }) => ($isRecording ? 'red' : 'inherit')};
    padding: 1.5px;
  }
  [data-label] {
    position: relative;
    &::after {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      content: attr(data-label);
      font-size: 0.6rem;
      color: var(--dark-blue);
      bottom: -0.8rem;
      transform: translateX(-50%);
      left: 50%;
      width: min-content;
      height: 1rem;
    }
  }
`;

function WrappedTopMenu() {
  const dispatch = useAppDispatch();
  const isRecording = useAppSelector(({ recording }) => recording.isRecording);
  const isPlaying = useAppSelector(({ recording }) => recording.isPlaying);
  const [todoName, setTodoName] = useState('');
  const [todoDesc, setTodoDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    if (isModalOpen) {
      setTodoName('');
      setTodoDesc('');
    }
    setIsModalOpen(!isModalOpen);
  };

  function handleInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.target.name === 'name') {
      setTodoName(e.target.value);
    } else {
      setTodoDesc(e.target.value);
    }
  }

  const handleAddTodo = () => {
    if (!todoName) {
      setError('Name is required.');
      setTimeout(() => {
        setError(null);
      }, 1500);
      return;
    }
    const date = new Date();
    const newTodo = {
      id: uuid(),
      name: todoName,
      description: todoDesc,
      creationDate: date
    };
    dispatch(addTodo(newTodo));
    handleModal();
  };

  const handleStartRecording = () => {
    if (!isRecording && !isPlaying) dispatch(startRecording());
  };
  const handleStopRecording = () => {
    if (!isPlaying) dispatch(stopRecording());
  };

  const handleDeleteSession = () => {
    if (!isPlaying) dispatch(deleteRecordingSession());
  };

  const handlePlaySession = () => {
    if (!isPlaying) dispatch(playRecordingSession());
  };

  return (
    <SyledTopMenu>
      <Container>
        <StyledWrapper>
          <h2>TODOs</h2>
          <RecordControl $isRecording={isRecording} $isPlaying={isPlaying}>
            <Tooltip
              id="rec"
              data-label="Rec"
              label={isRecording ? 'Recording actions...' : 'Record actions'}
              offset="0.95rem"
              offsetPx={15}
              onClick={handleStartRecording}
            >
              <RecBtn />
            </Tooltip>
            <Tooltip
              id="stop"
              data-label="Stop"
              label="Stop recording"
              offset="0.95rem"
              offsetPx={15}
              onClick={handleStopRecording}
            >
              <StopBtn />
            </Tooltip>
            <Tooltip
              id="play"
              data-label="Play"
              label={
                isPlaying
                  ? 'Replaying recorded session...'
                  : 'Replay recorded session'
              }
              offset="0.95rem"
              offsetPx={15}
              onClick={handlePlaySession}
            >
              <PlayBtn />
            </Tooltip>
            <Tooltip
              id="deleteRec"
              data-label="Delete"
              label="Clear recorded session"
              offset="0.95rem"
              offsetPx={15}
              onClick={handleDeleteSession}
            >
              <DeleteBtn />
            </Tooltip>
          </RecordControl>
          <StyledAddTodoBtn label="Add new todo" onClick={handleModal}>
            +
          </StyledAddTodoBtn>
        </StyledWrapper>
      </Container>
      {isModalOpen ? (
        <Modal close={handleModal} open={isModalOpen}>
          <TodoForm
            title="ADD TODO"
            error={error}
            isOpen={isModalOpen}
            setModal={handleModal}
            controlInput={handleInput}
            name={todoName}
            desc={todoDesc}
          >
            <Button colorProp="#f7ab1b" onClick={handleAddTodo}>
              ADD
            </Button>
          </TodoForm>
        </Modal>
      ) : null}
    </SyledTopMenu>
  );
}

const TopMenu = memo(WrappedTopMenu);

export default TopMenu;
