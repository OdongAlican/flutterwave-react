import { 
  useEffect, 
  useState 
} from 'react';
import {
  useFlutterwave,
  closePaymentModal
} from 'flutterwave-react-v3';
import { Button } from '@mui/material';

export default function Flutterwave() {
  const [payment, setPayment] = useState();
  const config = {
    public_key: 'FLWPUBK-d19c3d98607c6855116185d37aa00bf5-X',
    tx_ref: Date.now(),
    amount: 500,
    currency: 'UGX',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'kiizaj2@gmail.com',
      phone_number: '0777338787',
      // phone_number: '0703051139',
      name: 'odong sunday',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for documents',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    console.log(payment, "payment records!")
  }, [payment]);


  return (
    <Button
      size='small' sx={{ ml: 'auto', height: '35px' }} variant='contained'
      onClick={() => {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response);
            setPayment(response)
            closePaymentModal();
          },
          onClose: () => { },
        });
      }}
    >
      Purchase Document
    </Button>
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

/*
{
    "status": "successful",
    "customer": {
        "name": "odong sunday",
        "email": "kiizaj2@gmail.com",
        "phone_number": "0777338787"
    },
    "transaction_id": 1071173239,
    "tx_ref": 1695300046516,
    "flw_ref": "LXOG70731695300107500592",
    "currency": "UGX",
    "amount": 500,
    "charged_amount": 500,
    "charge_response_code": "00",
    "charge_response_message": "Request successfully processed",
    "created_at": "2023-09-21T12:41:47.000Z"
}

*/