import styled from 'styled-components';
import Button from './Button';

const StyledDialogBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.4rem;
  width: 30rem;
  max-width: 90vw;
  height: auto;
  min-height: 15rem;
  background-color: var(--white);
  padding: 1rem 3rem;
  box-shadow: var(--shadow-tree);
  text-align: center;
`;

type DialogBoxProps = {
  close: () => void;
  title?: string;
  message?: string;
};

function DialogBox({
  close,
  title = 'Message:',
  message = ''
}: DialogBoxProps) {
  return (
    <StyledDialogBox>
      <h2>{title}</h2>
      <p>{message}</p>
      <Button onClick={close}>Close</Button>
    </StyledDialogBox>
  );
}

export default DialogBox;
