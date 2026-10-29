import { useId, useRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode, ToggleEvent } from 'react';
import styled from 'styled-components';

const StyledTrigger = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  --interest-delay-start: 0.2s;
  interest-delay-start: var(--interest-delay-start);
  --interest-delay-end: 0.1s;
  interest-delay-end: var(--interest-delay-end);

  &:is(:interest-source, .interest-source) {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
    border-radius: 0.2rem;
  }
`;

const StyledPopover = styled.div<{ $offset: string }>`
  position: fixed;
  inset: auto;
  margin: 0;
  padding: 0.35rem 0.6rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--dark-blue);
  color: var(--white);
  font-family: 'Lato', sans-serif;
  font-size: 0.72rem;
  font-weight: 400;
  line-height: 1.2;
  white-space: nowrap;
  box-shadow: var(--shadow-two);
  pointer-events: auto;
  z-index: 20;

  &:is(:popover-open, .\\:popover-open) {
    display: block;
  }

  @supports (position-area: bottom) {
    position-area: bottom;
    position-try-fallbacks: flip-block;
    margin: ${({ $offset }) => $offset} 0;
  }
`;

type TooltipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  offset?: string;
  offsetPx?: number;
  children: ReactNode;
};

function Tooltip({
  label,
  offset = '0.45rem',
  offsetPx = 8,
  children,
  ...buttonProps
}: TooltipProps) {
  const reactId = useId();
  const tooltipId = `tooltip-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: ToggleEvent<HTMLDivElement>) => {
    if (
      e.newState === 'open' &&
      triggerRef.current &&
      popoverRef.current &&
      !(typeof CSS !== 'undefined' && CSS.supports?.('position-area', 'bottom'))
    ) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tip = popoverRef.current;
      const tipRect = tip.getBoundingClientRect();
      const fitsBelow =
        rect.bottom + offsetPx + tipRect.height <= window.innerHeight - 8;
      const top = fitsBelow
        ? rect.bottom + offsetPx
        : Math.max(8, rect.top - offsetPx - tipRect.height);
      const left = Math.min(
        Math.max(8, rect.left + rect.width / 2 - tipRect.width / 2),
        window.innerWidth - tipRect.width - 8
      );
      tip.style.top = `${top}px`;
      tip.style.left = `${left}px`;
    }
  };

  return (
    <>
      <StyledTrigger
        ref={triggerRef}
        type="button"
        aria-label={buttonProps['aria-label'] ?? label}
        interestfor={tooltipId}
        {...buttonProps}
      >
        {children}
      </StyledTrigger>
      <StyledPopover
        ref={popoverRef}
        popover="hint"
        id={tooltipId}
        $offset={offset}
        onToggle={handleToggle}
      >
        {label}
      </StyledPopover>
    </>
  );
}

export default Tooltip;
