import {
    useEffect,
    useState
} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    Stack,
    Typography,
    Tooltip
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
import { blue } from '@mui/material/colors';
import { toast } from 'react-toastify';
import { documentTypes } from '../../../utills/constants';
import Typewriter from "typewriter-effect";
import { StyledIconButton } from '../../component/styled/iconButton';

const IconButtonStyle = {
    bgcolor: "#FFF",
    borderRadius: '5px !important',
    p: 3,
    pt: 2,
    fontWeight: 'bold',
    pb: 6,
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
        bgcolor: blue[500],
        color: '#FFF',
    }
};

const SearchComponent = () => {
    const [docType, setDocType] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectDocumentType = (doc: string) => setDocType(doc);
    useEffect(() => { setDocType(documentTypes['online law report']) }, []);

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
                return;
            }
            return toast.error('Content does not exist');
        }
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Grid sx={{ height: '100%', display: 'flex', alignItems: 'center' }} container xs={12}>
                <Grid
                    item
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    marginTop={3}
                    xs={12}>
                    <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                            sx={{ color: '#fff', fontSize: '3rem', textAlign: 'center', fontWeight: 700 }}>
                            <Typography sx={{
                                display: 'flex',
                                fontSize: '3rem',
                                fontWeight: 700
                            }}> <Typography sx={{ mr: 2, fontSize: '3rem', fontWeight: 700 }}>
                                    Search For
                                </Typography>
                                <Typewriter
                                    options={{
                                        strings: [
                                            `<span style="color: ${blue[400]}">Uganda Law Reports</span>`,
                                            `<span style="color: ${blue[400]}">High Court Bulletings</span>`,
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        delay: 50,
                                        skipAddStyles: true
                                    }}
                                    onInit={(typewriter) => {
                                        typewriter
                                            .deleteAll()
                                            .start()
                                            .pauseFor(2500)
                                    }}
                                />
                            </Typography>
                        </Typography>
                        <Typography
                            sx={(theme) => ({
                                color: theme.palette.grey[50],
                                fontSize: '1rem',
                                textAlign: 'center',
                                textTransform: 'none'
                            })}>
                            Online Law Reporting Portal provides instant and easy search interface
                            <br />
                            through different types of documents
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, width: '65%' }}>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name='query'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <BootstrapInput
                                            placeholder={`Search ${docType}`}
                                            InputProps={{
                                                style: {
                                                    height: '90px',
                                                    padding: 0,
                                                    backgroundColor: '#fff',
                                                    paddingRight: '25px',
                                                    paddingLeft: '15px',
                                                },
                                                endAdornment: <InputAdornment position="end">
                                                    <Button
                                                        type='submit'
                                                        variant='contained'
                                                        sx={{
                                                            width: '100px',
                                                            borderRadius: 25,
                                                            textTransform: 'none',
                                                            height: '45px',
                                                            background: blue[400]
                                                        }}
                                                    >
                                                        Search
                                                    </Button>
                                                </InputAdornment>,
                                                startAdornment: <InputAdornment position='end' >
                                                    <SearchIcon fontSize='small' sx={{ mx: 1 }} />
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
                        <Stack sx={{ justifyContent: 'center', mt: 2 }} direction="row" spacing={2}>
                            <Tooltip title="High Court Bulletings">
                                <StyledIconButton
                                    sx={IconButtonStyle}
                                    onClick={() => {
                                        navigate(`${ROUTES.LIST_DOCUMENTS}/high`)
                                        selectDocumentType(documentTypes['high court bulletings'])
                                    }}>
                                    <i style={{
                                        fontSize: '40px',
                                        color: blue[500]
                                    }}
                                        className="fa fa-files-o"></i>
                                    <Typography sx={{
                                        textTransform: "uppercase",
                                        fontSize: '13px',
                                        mt: 2,
                                        fontWeight: 'bold'
                                    }}>High court <br /> bulletings</Typography>
                                </StyledIconButton>
                            </Tooltip>
                            <Tooltip title="On-Line Law Reports">
                                <StyledIconButton
                                    sx={IconButtonStyle}
                                    onClick={() => {
                                        navigate(`${ROUTES.LIST_DOCUMENTS}/law`)
                                        selectDocumentType(documentTypes['online law report'])
                                        }}>
                                    <i style={{
                                        fontSize: '40px',
                                        color: blue[500]
                                    }}
                                        className="fa fa-files-o"></i>
                                    <Typography sx={{
                                        textTransform: "uppercase",
                                        fontSize: '13px',
                                        mt: 2,
                                        fontWeight: 'bold'
                                    }}>Uganda Law <br /> Reports</Typography>
                                </StyledIconButton>
                            </Tooltip>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SearchComponent;
