import {
    Box,
    Button,
    FormControl,
    Grid,
    Toolbar,
    Typography
} from '@mui/material';
import SelectOption from '../../component/form/selectOptions';
import { courtTypes, documentTypesArray } from '../../../utills/constants';
import { BootstrapInput } from '../../component/form/input';
import LoopIcon from '@mui/icons-material/Loop';

interface IAdvancedSearch {
    onDocumentTypeChange: (text: string) => void;
}

const AdvancedSearch = ({
    onDocumentTypeChange,
}: IAdvancedSearch) => {

    return (
        <Box sx={{ py: 1 }}>
            <Toolbar>
                <Box style={{ flex: 1 }}>
                    <Grid container xs={12}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '15px', mb: 2 }}>Advanced Search Filters</Typography>
                        <Grid spacing={3} container item xs={12}>
                            <Grid item xs={12}>
                                <FormControl size='small' fullWidth>
                                    <SelectOption
                                        options={documentTypesArray}
                                        label='Select Document type'
                                        onChange={onDocumentTypeChange}
                                        id='filterEntries'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl size='small' fullWidth>
                                    <SelectOption
                                        options={courtTypes}
                                        label='Select Court'
                                        onChange={onDocumentTypeChange}
                                        id='filterEntries'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <BootstrapInput
                                        size='small'
                                        label='Judge'
                                        InputProps={{
                                            style: {
                                                padding: 0,
                                                backgroundColor: '#fff',
                                                paddingRight: '10px'
                                            }
                                        }}
                                        id='query'
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <BootstrapInput
                                        size='small'
                                        label='Parties'
                                        InputProps={{
                                            style: {
                                                padding: 0,
                                                backgroundColor: '#fff',
                                                paddingRight: '10px'
                                            }
                                        }}
                                        id='query'
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <BootstrapInput
                                        size='small'
                                        label='Year'
                                        InputProps={{
                                            style: {
                                                padding: 0,
                                                backgroundColor: '#fff',
                                                paddingRight: '10px'
                                            }
                                        }}
                                        id='query'
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl size='small' fullWidth>
                                    <Button sx={{ px: 2 }} startIcon={<LoopIcon />} variant="contained">Search</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Toolbar>
        </Box>
    )
}

export default AdvancedSearch;
