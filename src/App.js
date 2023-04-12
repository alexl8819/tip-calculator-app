import { useState } from 'react';
import styled from 'styled-components';

export default function App () {
  const [tipAmount, setTipAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const handleSubmit = (e) => e.preventDefault();

  return (
    <>
      <header>
        <p>Spli</p>
        <p>tter</p>
      </header>
      <form name="bill-calculator" onSubmit={handleSubmit}>
        <div>
          <label for="bill">Bill</label>
          <input type="text" name="bill" placeholder="" />

          <fieldset>
            <legend>Select Tip %</legend>

            <label for="fivepercent">5%</label>
            <input type="radio" id="fivepercent" name="tip" value="5" />

            <label for="fivepercent">10%</label>
            <input type="radio" id="fivepercent" name="tip" value="10" />

            <label for="fivepercent">15%</label>
            <input type="radio" id="fivepercent" name="tip" value="15" />

            <label for="fivepercent">25%</label>
            <input type="radio" id="fivepercent" name="tip" value="25" />

            <label for="fivepercent">50%</label>
            <input type="radio" id="fivepercent" name="tip" value="50" />
          </fieldset>

          <label for="people">Number of People</label>
          <input type="number" id="people" />
        </div>
        <div>
          <div>
            <div>
              <p>Tip Amount</p>
              <p>/ person</p>
            </div>
            <span>${ tipAmount }</span>
          </div>
          <div>
            <div>
              <p>Total</p>
              <p>/ person</p>
            </div>
            <span>${ totalAmount }</span>
          </div>

          <button type="reset">Reset</button>
        </div>
      </form>
    </>
  );
}