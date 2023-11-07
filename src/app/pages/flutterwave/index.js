import {
  useEffect,
  useState
} from 'react';
import {
  useFlutterwave,
  closePaymentModal
} from 'flutterwave-react-v3';
import { Button } from '@mui/material';
import { getUserFromSessionStorage } from '../../../utills/session';

export default function Flutterwave({
  makePayment,
  docName,
  inModal
}) {
  const [payment, setPayment] = useState();
  const [currentUserData, setCurrentUserData] = useState(getUserFromSessionStorage())

  const config = {
    public_key: 'FLWPUBK-d19c3d98607c6855116185d37aa00bf5-X',
    tx_ref: Date.now(),
    amount: 500,
    currency: 'UGX',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'kiizaj2@gmail.com',
      phone_number: currentUserData?.phonenumber,
      name: 'LDC Uganda',
    },
    customizations: {
      title: `Payment for ${docName}`,
      description: 'Payment for documents',
      logo: 'https://www.ldc.ac.ug/sites/files/Logo_1_c.png'
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    const userData = getUserFromSessionStorage()
    setCurrentUserData(userData);
    makePayment(payment);
  }, [payment]);

  return (
    <Button
      size='small' sx={{ ml: `${!inModal ? 'auto' : ''}`, height: '35px' }} variant='contained'
      onClick={() => {
        console.log(window, window.FlutterwaveCheckout, "windows flutterwave!!")
        if (window.FlutterwaveCheckout) {
          handleFlutterPayment({
            callback: (response) => {
              setPayment(response)
              closePaymentModal();
            },
            onClose: () => { },
          });
        }
      }}
    >
      Purchase Document
    </Button>
  );
};