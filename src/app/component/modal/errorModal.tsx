import {
    Box,
    Button,
    Modal,
    Typography
} from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    height: '20%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ErrorModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >

            <Box sx={style}>
                <Typography sx={{ textAlign: 'center' }}>To Read More, Log In</Typography>
                <Button
                onClick={handleClose}
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
