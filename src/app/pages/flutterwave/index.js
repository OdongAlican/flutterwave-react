import React from 'react';
import { 
  FlutterWaveButton, 
  closePaymentModal 
} from 'flutterwave-react-v3';

export default function Flutterwave() {
   const config = {
    public_key: 'FLWPUBK-d19c3d98607c6855116185d37aa00bf5-X',
    tx_ref: Date.now(),
    amount: 500,
    currency: 'UGX',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'kiizaj2@gmail.com',
      phone_number: '0703051139',
      name: 'odong sunday',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="App">
     <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}

/**
 * 
 * {
    "status": "successful",
    "customer": {
        "name": "odong sunday",
        "email": "kiizaj2@gmail.com",
        "phone_number": "0703051139"
    },
    "transaction_id": 1071089533,
    "tx_ref": 1695295561800,
    "flw_ref": "a8db4937-014b-4fb6-9969-8fb2c0c1bcaa",
    "currency": "UGX",
    "amount": 500,
    "charged_amount": 500,
    "charge_response_code": "00",
    "charge_response_message": "Approved Or Completed Successfully",
    "created_at": "2023-09-21T11:26:31.000Z"
}
 */