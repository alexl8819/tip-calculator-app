import { render, screen } from '@testing-library/react';
import { CustomNumberInput } from './Input';

const noop = () => {}

describe('CustomNumberInput component', () => {
  render(<CustomNumberInput name="test" placeholder="Custom" min="1" step="1" onChange={noop} />);

  test('Should have rendered', () => {
    expect(screen.getByPlaceholderText('Custom')).toBeTruthy();
  });
});
