import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

test('modal shows the children and close by clicking on the backdrop', () => {
  const handleClose = vi.fn();
  const { getByText, getByTestId } = render(
    <Modal close={handleClose}>
      <div>test</div>
    </Modal>
  );
  expect(getByText('test')).toBeTruthy();
  fireEvent.click(getByTestId('backdrop'));
  expect(handleClose).toHaveBeenCalledTimes(1);
});
