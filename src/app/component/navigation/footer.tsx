import { Box } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: 0,
            fontSize: '14px',
            p: 3,
            textAlign: 'center',
            color: '#fff'
        }}>
            © 2023 Law Development Centre. All Rights Reserved.
        </Box>
    )
}

export default Footer
