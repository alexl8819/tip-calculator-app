import { render, screen } from '@testing-library/react';
import ResultDisplay from './Result';

const calculateTipOwed = '1.25';
const calculateTotalOwed = '13.75';

const resetAll = () => {};

describe('ResultDisplay component', () => {
  render(<ResultDisplay calculateTipOwed={calculateTipOwed} calculateTotalOwed={calculateTotalOwed} resetAll={resetAll} isDisabled={false} />);

  test('Should have rendered $1.25 for tip owed and $13.75 for total', () => {
    expect(screen.getByText('$1.25')).toBeTruthy();
    expect(screen.getByText('$13.75')).toBeTruthy();
  });
});
