import { useEffect } from 'react';
import {
    Box,
    Card
} from '@mui/material'
const AuditTrails = () => {

    useEffect(() => {

    },[]);

    return (
        <Box sx={{ px: 4 }}>
            <Card sx={{ pb: 2 }} >
                <Box
                    sx={{ width: '100%', overflowX: 'auto' }}
                >
                    Audit trails
                </Box>
            </Card>
        </Box>
    )
}

export default AuditTrails;
