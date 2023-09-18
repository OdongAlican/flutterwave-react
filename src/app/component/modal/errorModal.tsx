import {
    Box,
    Button,
    Modal,
    TextField
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { apiURL } from '../../../core/api/baseURL';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    height: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface IAuthState {
    email: string;
    password: string
}

const authInitialState = {
    email: 'email',
    password: 'password'
}

const ErrorModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
    const [authState, setAuthState] = useState<IAuthState>(authInitialState)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setAuthState({
            ...authState,
            [name]: value
        })
    };

    const logIn = () => {
        axios.post(`${apiURL}/auth/login`, {
            email: authState.email,
            password:authState.password
        }).then((response) => {
            console.log(response.data, 'response data')
        }).catch(error => console.log(error))
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >

            <Box sx={style}>
                <TextField name='email' onChange={(e: any) => handleChange(e)} size='small' id="outlined-basic" label="Email" variant="outlined" />
                <TextField name='password' onChange={(e: any) => handleChange(e)} sx={{ mt: 1 }} size='small' id="outlined" label="Password" variant="outlined" />
                <Button
                    onClick={logIn}
                    sx={{
                        mt: 2,
                        width: '100%'
                    }}
                    variant='contained'> Log In</Button>
            </Box>
        </Modal>
    )
}

export default ErrorModal
