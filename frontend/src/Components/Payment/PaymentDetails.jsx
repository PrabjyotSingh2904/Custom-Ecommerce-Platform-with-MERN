import React, { useState } from 'react';
import './PaymentDetails.css'; // Include styles for the payment page

const PaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method is Card
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    billingAddress: '',
    upiId: '',
    netBankingBank: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (
        !paymentInfo.cardNumber ||
        !paymentInfo.expiryDate ||
        !paymentInfo.cvv ||
        !paymentInfo.cardHolderName ||
        !paymentInfo.billingAddress
      ) {
        alert('Please fill in all card payment details.');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentInfo.upiId) {
        alert('Please enter your UPI ID.');
        return;
      }
    } else if (paymentMethod === 'netBanking') {
      if (!paymentInfo.netBankingBank) {
        alert('Please select your bank for net banking.');
        return;
      }
    }

    alert('Payment Successful!');
    console.log('Payment Info Submitted:', paymentInfo);
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>

      {/* Payment Method Selection */}
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Card Payment
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="netBanking"
            checked={paymentMethod === 'netBanking'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Net Banking
        </label>
      </div>

      {/* Payment Form Based on Selected Method */}
      <form className="payment-form">
        {paymentMethod === 'card' && (
          <>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="16"
              />
            </label>
            <label>
              Expiry Date:
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
              />
            </label>
            <label>
              CVV:
              <input
                type="password"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="3"
              />
            </label>
            <label>
              Card Holder Name:
              <input
                type="text"
                name="cardHolderName"
                value={paymentInfo.cardHolderName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </label>
            <label>
              Billing Address:
              <textarea
                name="billingAddress"
                value={paymentInfo.billingAddress}
                onChange={handleChange}
                placeholder="1234 Main St, City, State, ZIP"
              />
            </label>
          </>
        )}

        {paymentMethod === 'upi' && (
          <label>
            UPI ID:
            <input
              type="text"
              name="upiId"
              value={paymentInfo.upiId}
              onChange={handleChange}
              placeholder="your-upi-id@bank"
            />
          </label>
        )}

        {paymentMethod === 'netBanking' && (
          <label>
            Select Bank:
            <select
              name="netBankingBank"
              value={paymentInfo.netBankingBank}
              onChange={handleChange}
            >
              <option value="">-- Select Your Bank --</option>
              <option value="ABC">ABC Bank</option>
              <option value="DEF">DEF Bank</option>
              <option value="GHI">GHI Bank</option>
              <option value="XYZ">XYZ Bank</option>
            </select>
          </label>
        )}

        <button type="button" className="payment-button" onClick={handlePayment}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentDetails;
