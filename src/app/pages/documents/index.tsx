import {
    useContext,
    useEffect
} from 'react';
import {
    Box,
    Card
} from '@mui/material'
import { LoginContext } from '../../context/login';
import axios from 'axios';
import { apiURL } from '../../../core/api/baseURL';
const MyDocuments = () => {
    const { currentUserData } = useContext(LoginContext);

    console.log(currentUserData, "current data");

    const fetchDocuments = () => {
        axios.get(`${apiURL}payments/transactions/2`).then((response) => {
            console.log(response.data, "response data");
        }).catch((error: any) => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <Box sx={{ px: 4 }}>
            <Card sx={{ pb: 2 }} >
                <Box
                    sx={{ width: '100%', overflowX: 'auto', p: 4 }}
                >
                    My Documents
                </Box>
            </Card>
        </Box>
    )
}

export default MyDocuments;
