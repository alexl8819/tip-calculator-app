import { render, screen, within, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  render(<App />);

  test('Should render a tip result of $6.45 from a $172 bill with 4 people', () => {
    const tipInputForm = screen.getByRole('form');
    const inputs = within(tipInputForm).getAllByPlaceholderText('0');
    const selectedTip = within(tipInputForm).getByLabelText('15%');

    fireEvent.change(inputs[0], {target: { value: '172'}});
    fireEvent.click(selectedTip);
    fireEvent.change(inputs[1], {target: { value: '4'}});
  
    expect(within(tipInputForm).getByDisplayValue('172')).toBeTruthy();
    expect(within(tipInputForm).getByDisplayValue('4')).toBeTruthy();

    expect(screen.getByText('$6.45')).toBeTruthy();
  });
});
