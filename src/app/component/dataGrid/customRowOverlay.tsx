import {
    Box,
    Typography
} from '@mui/material'

const CustomRowOverlay = () => (
    <Box
        component='div'
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <Box sx={{ mr: 2 }}>
            <i style={{ fontSize: '30px' }} className="fa fa-folder-open-o" aria-hidden="true"></i>
        </Box>
        <Box>
            <Typography>
                No Documents
            </Typography>
        </Box>
    </Box>
)

export default CustomRowOverlay
