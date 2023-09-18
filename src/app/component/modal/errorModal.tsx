import {
    Box,
    Modal,
} from '@mui/material';
import { ReactNode } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 3,
    px: 4,
    pb: 3,
};

interface IModal {
    open: boolean;
    handleClose: () => void;
    children: ReactNode;
}

const ErrorModal = ({ open, handleClose, children }: IModal) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >

            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}

export default ErrorModal
