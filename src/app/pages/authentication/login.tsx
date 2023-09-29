import { useContext, useState } from 'react';
import {
    Grid,
    Box,
    FormControl,
    FormHelperText,
    InputAdornment,
    IconButton,
    Button,
    CircularProgress,
} from '@mui/material';
import {
    useForm,
    Controller
} from 'react-hook-form';
import { BootstrapInput } from '../../component/form/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { apiURL } from '../../../core/api/baseURL';
import { IAuthState } from './interface';
import { accessTokenKey } from '../../../utills/constants';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loadUser } from './user_slice';
import { LoginContext } from '../../context/login';
interface ILogin {
    setRegisterModal: () => void;
    handleClose: () => void;
    setAccessTokenFxn: (token: string) => void;
}

const Login = ({ setRegisterModal, handleClose, setAccessTokenFxn }: ILogin) => {
    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch();
    
    const { isAuth, setAuth } = useContext(LoginContext);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    console.log(isAuth, "is authenticated");
    
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IAuthState>({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = (formData: IAuthState) => {
        setLoggingIn(true);
        axios.post(`${apiURL}auth/login`, formData).then((response) => {
            sessionStorage.setItem(accessTokenKey, response.data?.accesstoken);
            setAccessTokenFxn(response.data?.accesstoken as string);
            setAuth(true)
            setLoggingIn(false);
            handleClose();
            dispatch(loadUser(response.data));
            toast.success(`Welcome ${response.data.firstName}`);
        }).catch((error: any) => {
            toast.error('Something went wrong. Confirm your credential');
            setLoggingIn(false);
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item container xs={12} sx={(theme) => ({
                        bgcolor: theme.palette.background.paper,
                        borderRadius: '6px'
                    })}>
                        <Grid item container spacing={3} xs={12}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='email'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='email'
                                                label='Email address'
                                                variant="outlined"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                error={Boolean(errors.email)}
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='password'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='password'
                                                label='Password'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                error={Boolean(errors.password)}
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Box component='div'>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        fullWidth
                                        size='large'
                                        sx={{
                                            textTransform: 'none'
                                        }}
                                        startIcon={
                                            loggingIn ? (
                                                <CircularProgress />
                                            ) : ('')
                                        }
                                        disabled={loggingIn}
                                    >
                                        Log in
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{
                        width: '100%',
                        py: 1,
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}>
                        <Button onClick={setRegisterModal}>Sign up</Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    )
}

export default Login
