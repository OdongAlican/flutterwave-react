import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Avatar
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
import { IResponseData } from '../listDocuments/interface';
import { fetchDocuments } from '../listDocuments/documents_api';
import { useDispatch } from 'react-redux';
import { loadData } from '../listDocuments/documents_slice';
import Logo from '../../../assets/images/Logo.png';
import { grey } from '@mui/material/colors';

const SearchComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        handleSubmit,
        control,
        formState,
    } = useForm<{ query: string }>({
        mode: 'onChange',
        resolver: yupResolver(querySchema)
    });

    const onSubmit = async (formData: { query: string }) => {
        const data: IResponseData = await fetchDocuments(formData.query);

        if (data?.status === 200
            && data.statusText === 'OK') {
            const res = data.data.list.entries.map((entry) => entry.entry);
            dispatch(loadData(res));
            navigate(`${ROUTES.LIST_DOCUMENTS}/${formData.query}`);
        }
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Grid sx={{ height: '100%' }} container xs={12}>
                <Grid
                    item
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    xs={6}>
                    <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Avatar sx={{ mr: 2, bgcolor: grey[50],height: 100, width: 100 }} alt="LDC" src={Logo} />
                        </Box>
                        <Grid
                            sx={{
                                // height: 400,
                                // bgcolor: 'cyan',
                            }}
                            item
                            xs={12}
                        >
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
                            <Button
                                sx={{
                                    width: "100%",
                                    mt: 2
                                }}
                                type='submit'
                                startIcon={<SearchIcon />}
                                variant='contained'
                            >
                                Search
                            </Button>
                        </Grid>

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
