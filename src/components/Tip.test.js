import { render, screen } from '@testing-library/react';
import TippingMenu from './Tip';

const tipMenu = [
  {
    id: '63a1876a-f221-4d64-8acd-e13ba1b3db50',
    amount: 5,
    value: 'fivePercent'
  },
  {
    id: 'c5ba64ab-02c4-4714-a5a6-be41cde55f24',
    amount: 10,
    value: 'tenPercent'
  },
  {
    id: '7dd1c114-facb-47f6-a151-36959ce73042',
    amount: 15,
    value: 'fifteenPercent'
  }
];

describe('TippingMenu component', () => {
  render(<TippingMenu menu={tipMenu} allowCustomField={true} setTipPercentage={() => {}} />);

  test('Should have rendered tip menu (5%, 10%, 15%) with custom tip input', () => {
    expect(screen.getByLabelText('5%')).toBeTruthy();
    expect(screen.getByLabelText('10%')).toBeTruthy();
    expect(screen.getByLabelText('15%')).toBeTruthy();
    expect(screen.getByPlaceholderText('Custom')).toBeTruthy();
  });
});
