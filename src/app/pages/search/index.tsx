import {
    Box,
    Button,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../core/routes/routes';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ height: '100%' }}>
            <Grid sx={{ height: '100%' }} container xs={12}>
                <Grid item xs={6}>
                    <Button
                        startIcon={<SearchIcon />}
                        variant='contained'
                        onClick={() => navigate(ROUTES.LIST_DOCUMENTS)}>Search</Button>
                </Grid>
                <Grid sx={{ height: '100%' }} item xs={6}>
                    <p>Sample information</p>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SearchComponent
