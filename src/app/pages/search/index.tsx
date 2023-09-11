import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    Typography
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
import { cyan } from '@mui/material/colors';

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
            if (res.length > 0) {
                navigate(`${ROUTES.LIST_DOCUMENTS}/${formData.query}`);
            }
        }
    }

    return (
        <Box sx={{ height: '100%' }}>
            <Grid sx={{ height: '100%', display: 'flex', alignItems: 'center' }} container xs={12}>
                <Grid
                    item
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    marginTop={20}
                    xs={12}>
                    <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                        <Typography sx={{ color: '#fff', fontSize: '35px', textAlign: 'center' }}>
                            Search For ?
                        </Typography>
                        <Typography sx={(theme) => ({ color: theme.palette.grey[50], fontSize: '18px', textAlign: 'center' })}>
                            Online Law Reporting Portal provides instant and easy search interface
                            <br />
                            through different types of documents
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name='query'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <BootstrapInput
                                            placeholder='Search text'
                                            InputProps={{
                                                style: {
                                                    padding: 0,
                                                    borderRadius: 25,
                                                    height: '45px',
                                                    backgroundColor: '#fff',
                                                    paddingRight: '10px'
                                                },
                                                startAdornment: <InputAdornment position="start">
                                                    <Button
                                                        type='submit'
                                                        variant='contained'
                                                        sx={{
                                                            bgcolor: cyan[700],
                                                            borderRadius: 25,
                                                            width: '200px',
                                                            borderTopRightRadius: '0',
                                                            borderBottomRightRadius: '0',
                                                            height: '45px'
                                                        }}
                                                    >
                                                        Search
                                                    </Button>
                                                </InputAdornment>,
                                                endAdornment: <InputAdornment position='end' >
                                                    <SearchIcon />
                                                </InputAdornment>
                                            }}
                                            id='query'
                                            variant="outlined"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(formState.errors.query)}
                                        />
                                    )}
                                />
                                {formState.errors.query && (
                                    <FormHelperText sx={{ color: '#fff', textAlign: 'end' }}>{formState.errors.query.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SearchComponent;
