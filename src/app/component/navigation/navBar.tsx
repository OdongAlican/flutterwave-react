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
    blue,
    grey
} from '@mui/material/colors';
import {
    useLocation,
    useNavigate
} from 'react-router';
import { ROUTES } from '../../../core/routes/routes';
import { IUserState } from '../../pages/authentication/user_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store';
import { useEffect, useState } from 'react';
import { removeAuthTokenFromSessionStorage } from '../../../utills/session';

const linkStyles = {
    textTransform: 'capitalize',
    color: '#FFF',
    borderRadius: '30px',
    '&:hover': {
        color: 'white',
    }
};

const NavBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { data }: IUserState = useSelector((state: RootState) => state?.userState);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (data?.firstName.length > 0) {
            setIsAuthenticated(true);
        }
    }, [data]);

    const logOut = () => {
        setIsAuthenticated(false);
        removeAuthTokenFromSessionStorage();
        navigate(ROUTES.HOME);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ boxShadow: 'none', background: 'transparent', p: 2 }} position="static">
                <Toolbar>
                    <IconButton onClick={() => navigate(ROUTES.HOME)}>
                        <Avatar sx={{
                            width: 56,
                            height: 56,
                            mr: 2,
                            bgcolor: grey[50]
                        }} alt="LDC" src={Logo} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'uppercase', fontSize: '16px', fontWeight: 'bold' }}>
                        Law <span>Development</span> Center
                        <Typography sx={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: `${blue[400]}`
                        }}>A Tradition of Legal Excellence</Typography>
                    </Typography>
                    <Button
                        onClick={() => navigate(ROUTES.HOME)}
                        size='medium' sx={{
                            ...linkStyles,
                            mr: '10px',
                            backgroundColor: !pathname.includes(ROUTES.LIST_DOCUMENTS) ? blue[700] : 'none',
                            px: 3
                        }}>Home</Button>
                    <Button size='medium' sx={{
                        ...linkStyles,
                        backgroundColor: pathname.includes(ROUTES.LIST_DOCUMENTS) ? blue[700] : 'none',
                    }}>Advanced Search</Button>
                    {isAuthenticated && <Button
                        onClick={logOut}
                        size='medium' sx={{
                            ...linkStyles,
                            backgroundColor: pathname.includes(ROUTES.AUDIT_TRAILS) ? blue[700] : 'none',
                        }}>Log Out</Button>}

                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavBar;
