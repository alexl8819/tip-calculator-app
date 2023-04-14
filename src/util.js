export function calculateOwed (env, owed) {
  if (!env.billAmount || !env.tipPercentage || !env.numOfPpl) {
    return '0.00';
  }

  const currentBillAmount = parseFloat(env.billAmount);
  const selectedTipPercentage = parseInt(env.tipPercentage) / 100;
  const people = parseInt(env.numOfPpl);
  const newTipAmount = ((currentBillAmount * selectedTipPercentage) / people);
    
  return owed === 'tip' ? newTipAmount.toFixed(2) : ((currentBillAmount / people) + newTipAmount).toFixed(2);
}
