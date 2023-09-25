import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    Stack,
    Typography,
    IconButton,
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
import { blue, cyan } from '@mui/material/colors';
import { toast } from 'react-toastify';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { documentTypes } from '../../../utills/constants';

const SearchComponent = () => {
    const [docType, setDocType] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectDocumentType = (doc: string) => setDocType(doc);

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
    }
    console.log(docType, "doc type");

    return (
        <Box sx={{ height: '100%' }}>
            <Grid sx={{ height: '100%', display: 'flex', alignItems: 'center' }} container xs={12}>
                <Grid
                    item
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    marginTop={14}
                    xs={12}>
                    <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                        <Typography sx={{ color: '#fff', fontSize: '38px', textAlign: 'center' }}>
                            Search For ?
                        </Typography>
                        <Typography sx={(theme) => ({ color: theme.palette.grey[50], fontSize: '14px', textAlign: 'center', textTransform: 'uppercase' })}>
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
                                            placeholder={`Search ${docType}`}
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
                        <Stack sx={{ justifyContent: 'center', mt: 2 }} direction="row" spacing={2}>
                            <IconButton onClick={() => selectDocumentType(documentTypes['online law report'])}>
                                <Tooltip title="On-Line Law Reports">
                                    <ArticleIcon
                                        sx={(theme) => ({
                                            fontSize: '48px',
                                            color: `${docType === documentTypes['online law report'] ? blue[500] :
                                                theme.palette.grey[300]}`,
                                        })} />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => selectDocumentType(documentTypes['high court bulletings'])}>
                                <Tooltip title="High court bulletings">
                                    <DescriptionIcon
                                        sx={(theme) => ({
                                            fontSize: '48px',
                                            color: `${docType === documentTypes['high court bulletings'] ? blue[500] :
                                                theme.palette.grey[300]}`,
                                        })} />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => selectDocumentType(documentTypes['legal document'])}>
                                <Tooltip title="Legal document">
                                    <InsertDriveFileIcon
                                        sx={(theme) => ({
                                            fontSize: '48px',
                                            color: `${docType === documentTypes['legal document'] ? blue[500] :
                                                theme.palette.grey[300]}`,
                                        })} />
                                </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => selectDocumentType(documentTypes['journal'])}>
                                <Tooltip title="Journals">
                                    <AssignmentIcon
                                        sx={(theme) => ({
                                            fontSize: '48px',
                                            color: `${docType === documentTypes['journal'] ? blue[500] :
                                                theme.palette.grey[300]}`,
                                        })} />
                                </Tooltip>
                            </IconButton>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </Box>
    )
}

export default SearchComponent;
