import {
    AppBar,
    Avatar,
    Box,
    Button,
    Toolbar,
    Typography
} from '@mui/material';
import Logo from '../../../assets/images/Logo.png';
import { grey } from '@mui/material/colors';
import { 
    useLocation, 
    useNavigate 
} from 'react-router';
import { ROUTES } from '../../../core/routes/routes';

const NavBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ boxShadow: 'none' }} position="static">
                <Toolbar>
                    <Avatar sx={{ mr: 2, bgcolor: grey[50] }} alt="LDC" src={Logo} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Law Development Center
                    </Typography>
                    {
                        pathname.includes(ROUTES.LIST_DOCUMENTS) ? (
                            <Button onClick={() => navigate(ROUTES.HOME) } color="inherit">Back</Button>
                        ) : null
                    }
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar;
