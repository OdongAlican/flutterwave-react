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

export default function Flutterwave({ makePayment, docName, inModal }) {
  const [payment, setPayment] = useState();
  const [currentUserData, setCurrentUserData] = useState(getUserFromSessionStorage())

  const config = {
    public_key: 'FLWPUBK-d19c3d98607c6855116185d37aa00bf5-X',
    tx_ref: Date.now(),
    amount: 500,
    currency: 'UGX',
    payment_options: 'card,ussd,mobilemoneyuganda',
    customer: {
      email: 'ldc@ldc.ac.ug',
      phone_number: currentUserData?.phonenumber,
      name: 'LDC Uganda',
    },
    customizations: {
      title: `Payment for ${docName}`,
      description: 'Payment for documents',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
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
        handleFlutterPayment({
          callback: (response) => {
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