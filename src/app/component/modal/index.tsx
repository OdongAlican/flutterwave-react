import {
    Modal,
    Box
} from '@mui/material';

interface IModalComponent {
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ModalComponent = ({
    open, handleClose, children
}: IModalComponent) => {

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

export default ModalComponent;
