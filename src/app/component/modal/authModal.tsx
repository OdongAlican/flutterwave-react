import {
    Box,
    Modal,
    Avatar,
    IconButton
} from '@mui/material';
import { ReactNode } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Logo from '../../../assets/images/Logo.png';
import { authComponents } from '../../../utills/constants';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pb: 3,
    borderRadius: 1
};

interface IModal {
    open: boolean;
    handleClose: () => void;
    children: ReactNode;
    component?: string;
}

const AuthModal = ({ open, handleClose, children, component }: IModal) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: `${component === authComponents.register ? '60%' : '30%'}` }}>
                <Box sx={{ display: 'flex', justifyContent: 'end', p: 1 }}>
                    <IconButton onClick={handleClose}>
                        <CancelOutlinedIcon
                            sx={(theme) => ({ cursor: 'pointer', color: theme.palette.grey[600] })} fontSize='medium' />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        sx={{ width: 60, height: 60 }}
                        alt="LDC" src={Logo} />
                </Box>
                <Box sx={{ px: 4 }}>
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}

export default AuthModal;
