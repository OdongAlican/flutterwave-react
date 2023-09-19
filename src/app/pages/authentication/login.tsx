import { useState } from 'react';
import {
    Grid,
    Box,
    FormControl,
    FormHelperText,
    InputAdornment,
    IconButton,
    Button,
    CircularProgress,
    Link
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


interface IAuthState {
    email: string;
    password: string
}

const Login = () => {
    const [loggingIn, setLoggingIn] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
            console.log(response.data, "response data")
        }).catch((error: any) => console.log(error))
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
                        width:'100%',
                        py: 1,
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}>
                        <Link>Sign up</Link>
                    </Box>
                </Grid>
            </form>
        </Box>
    )
}

export default Login
