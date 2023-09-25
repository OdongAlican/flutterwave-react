import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';
import Logo from '../../../assets/images/Logo.png';
import {
    cyan,
    grey
} from '@mui/material/colors';
import {
    useLocation,
    useNavigate
} from 'react-router';
import { ROUTES } from '../../../core/routes/routes';

const linkStyles = {
    textTransform: 'uppercase',
    color: '#FFF',
    borderRadius: '0px ',
    '&:hover': {
        color: 'white',
        borderBotton: `2px solid red`
    }
};

const NavBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ boxShadow: 'none', background: 'transparent', p: 2 }} position="static">
                <Toolbar>
                    <IconButton onClick={() => navigate(ROUTES.HOME)}>
                        <Avatar sx={{ mr: 2, bgcolor: grey[50] }} alt="LDC" src={Logo} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase', fontSize: '16px', fontWeight: 'bold' }}>
                        Law <span>Development</span> Center
                        <Typography sx={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: `${cyan[700]}`
                        }}>A Tradition of Legal Excellence</Typography>
                    </Typography>
                    <Button
                        onClick={() => navigate(ROUTES.HOME)}
                        size='small' sx={{
                            ...linkStyles,
                            mr: '10px',
                            borderBottom: !pathname.includes(ROUTES.LIST_DOCUMENTS) ? `2px solid ${cyan[700]}` : 'none',
                            p: 0
                        }}>Home</Button>
                    <Button size='small' sx={{
                        ...linkStyles,
                        borderBottom: pathname.includes(ROUTES.LIST_DOCUMENTS) ? `2px solid ${cyan[700]}` : 'none',
                    }}>Advanced Search</Button>
                    
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavBar;
