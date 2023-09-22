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
};