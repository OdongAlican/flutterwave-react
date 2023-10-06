import { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Grid,
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
import {
    BootstrapInput,
    BootstrapPhoneNumber
} from '../../component/form/input';
import { IRegister } from './interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './schema';
import { apiURL } from '../../../core/api/baseURL';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { toast } from 'react-toastify';

const SignUp = ({ handleClose }: {
    handleClose: () => void;
}) => {
    const [register, setRegister] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IRegister>({
        mode: 'onChange',
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (formData: IRegister) => {
        setRegister(true);
        axios.post(`${apiURL}auth/register`, formData).then((response) => {
            setRegister(true);
            toast.success('Successfully registered');
            handleClose();
        }).catch((error: any) => {
            setRegister(true);
            console.log(error);
        })
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
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='firstname'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='firstname'
                                                label='First Name'
                                                variant="outlined"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                error={Boolean(errors.firstname)}
                                            />
                                        )}
                                    />
                                    {errors.firstname && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.firstname.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='lastname'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='lastname'
                                                label='Last Name'
                                                variant="outlined"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                error={Boolean(errors.lastname)}
                                            />
                                        )}
                                    />
                                    {errors.lastname && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.lastname.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='username'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='username'
                                                label='User Name'
                                                variant="outlined"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                error={Boolean(errors.username)}
                                            />
                                        )}
                                    />
                                    {errors.username && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='location'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='location'
                                                label='Location'
                                                variant="outlined"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationOnOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                error={Boolean(errors.location)}
                                            />
                                        )}
                                    />
                                    {errors.location && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.location.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='phonenumber'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapPhoneNumber
                                                size='small'
                                                id='phonenumber'
                                                label='Mobile Number'
                                                variant="outlined"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                error={Boolean(errors.phonenumber)}
                                            />
                                        )}
                                    />
                                    {errors.phonenumber && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.phonenumber.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
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
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <EmailOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                error={Boolean(errors.email)}
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
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

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='password'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='password'
                                                label='Confirm Password'
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
                            <Grid item xs={12} display='flex' justifyContent='center'>
                                <Box component='div'>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        fullWidth
                                        size='large'
                                        sx={{
                                            textTransform: 'none',
                                            width: '200px',
                                            px: 2
                                        }}
                                        startIcon={
                                            register ? (
                                                <CircularProgress />
                                            ) : ('')
                                        }
                                        disabled={register}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default SignUp;
