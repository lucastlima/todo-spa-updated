import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ $colorProp?: string }>`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ $colorProp }) =>
    $colorProp ? $colorProp : 'var(--blue)'};
  margin: 0.5rem;
  border-radius: 0.3rem;
  color: var(--white);
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-shadow: var(--shadow-one);
  transition: transform 0.1s ease-in;

  &:hover {
    transform: scale(1.05);
  }
`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  colorProp?: string;
};

function Button({ children, colorProp, ...rest }: ButtonProps) {
  return (
    <StyledButton $colorProp={colorProp} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
