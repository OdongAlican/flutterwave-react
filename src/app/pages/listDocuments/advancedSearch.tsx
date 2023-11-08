import {
    Box,
    Button,
    FormControl,
    Grid,
    Toolbar,
    Typography
} from '@mui/material';
import SelectOption from '../../component/form/selectOptions';
import {
    courtTypes,
    documentTypesArray
} from '../../../utills/constants';
import { BootstrapInput } from '../../component/form/input';
import LoopIcon from '@mui/icons-material/Loop';

interface IAdvancedSearch {
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleSelectChange: (value: string, name: string) => void;
    onSubmit: () => void;
}

const AdvancedSearch = ({
    handleChange, handleSelectChange, onSubmit
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
                                        name='docType'
                                        options={documentTypesArray}
                                        label='Select Document type'
                                        onChange={handleSelectChange}
                                        id='filterEntries'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl size='small' fullWidth>
                                    <SelectOption
                                        name='court'
                                        options={courtTypes}
                                        label='Select Court'
                                        onChange={handleSelectChange}
                                        id='filterEntries'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <BootstrapInput
                                        name='judge'
                                        size='small'
                                        label='Judge'
                                        onChange={(e: any) => handleChange(e)}
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
                                        name='parties'
                                        size='small'
                                        label='Parties'
                                        onChange={(e: any) => handleChange(e)}
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
                                        name='year'
                                        size='small'
                                        label='Year'
                                        onChange={(e: any) => handleChange(e)}
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
                                    <Button 
                                    onClick={onSubmit}
                                    sx={{ px: 2 }} startIcon={<LoopIcon />} variant="contained">Search</Button>
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
