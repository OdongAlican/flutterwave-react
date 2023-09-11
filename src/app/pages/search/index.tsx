import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid
} from '@mui/material';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../../core/routes/routes';
import SearchIcon from '@mui/icons-material/Search';
import { 
    Controller, 
    useForm 
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { querySchema } from './schema';
import { BootstrapInput } from '../../component/form/input';

const SearchComponent = () => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState,
    } = useForm<{ query: string }>({
        mode: 'onChange',
        resolver: yupResolver(querySchema)
    });

    const onSubmit = (formData: { query: string }) => {
        console.log(formData, 'form data')
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Grid sx={{ height: '100%' }} container xs={12}>
                <Grid item xs={6}>
                    <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name='query'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <BootstrapInput
                                            size='small'
                                            id='query'
                                            label='Search Document'
                                            variant="outlined"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(formState.errors.query)}
                                        />
                                    )}
                                />
                                {formState.errors.query && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{formState.errors.query.message}</FormHelperText>
                                )}
                            </FormControl>

                        </Grid>

                        <Button
                            type='submit'
                            startIcon={<SearchIcon />}
                            variant='contained'
                            onClick={() => navigate(ROUTES.LIST_DOCUMENTS)}>Search</Button>
                    </form>
                </Grid>
                <Grid sx={{ height: '100%' }} item xs={6}>
                    <p>Sample information</p>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SearchComponent
