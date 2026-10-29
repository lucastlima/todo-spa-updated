import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const StyledModal = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  width: min-content;
  height: min-content;
  animation: fadeIn 0.2s ease-in;
  will-change: opacity;
`;
const StyledBackdrop = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(9, 53, 84, 0.9);
  animation: fadeIn 0.2s ease-in;
  will-change: opacity;
`;

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

type ModalProps = {
  children?: ReactNode;
  open?: boolean;
  close: () => void;
};

const Modal = ({ children, open = false, close }: ModalProps) => {
  return ReactDOM.createPortal(
    <>
      <StyledModal $open={open}>{children}</StyledModal>
      <StyledBackdrop data-testid="backdrop" onClick={close} $open={open} />
    </>,
    modalRoot
  );
};

export default Modal;
