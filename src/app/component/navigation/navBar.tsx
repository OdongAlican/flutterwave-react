import { useContext, useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
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
import { removeAuthTokenFromSessionStorage } from '../../../utills/session';
import { LoginContext } from '../../context/login';
import { pages } from '../../../utills/constants';

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
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { isAuth, setAuth, currentUserData } = useContext(LoginContext);

    const logOut = (page: number) => {
        if (page !== 3) return;
        setAuth(false)
        removeAuthTokenFromSessionStorage();
        navigate(ROUTES.HOME);
    };

    const mangePageRouting = (page: number) => {
        if (page === 1) navigate(ROUTES.BOOKMARKS);
        if (page === 2) navigate(ROUTES.MY_DOCUMENTS);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                    {isAuth && <Box sx={{ flexGrow: 0, ml: 2 }}>
                        <Tooltip title={currentUserData.lastName}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar >{currentUserData?.lastName?.charAt(0)}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.id} onClick={() => {
                                        handleCloseUserMenu()
                                        page.id === 3 ? logOut(page.id) : mangePageRouting(page.id)
                                    }}>
                                    <Typography

                                        textAlign="center">{page.key}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default NavBar;
