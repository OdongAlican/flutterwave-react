import {
    Box,
    Button,
    FormControl,
    Grid,
    Toolbar,
    Typography
} from '@mui/material';
import SelectOption from '../../component/form/selectOptions';
import { entriesColumns } from '../../../utills/constants';
import { BootstrapInput } from '../../component/form/input';
import DatePickerValue from '../../component/form/datePicker';
import { ICustomGridToolBar } from './interface';
import LoopIcon from '@mui/icons-material/Loop';

const AdvancedSearch = ({
    filteredEntries,
    onNameChange,
    onDateChange,
    refresh,
    onColumnNameChange,
    filterState
}: ICustomGridToolBar) => {

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
                                        options={entriesColumns}
                                        label='Filter by'
                                        onChange={onColumnNameChange}
                                        id='filterEntries'
                                    />
                                </FormControl>
                            </Grid>
                            {
                                (
                                    filterState === entriesColumns[0].value ||
                                    filterState === entriesColumns[1].value ||
                                    filterState === entriesColumns[2].value ||
                                    filterState === entriesColumns[4].value ||
                                    filterState === entriesColumns[5].value
                                ) ? (
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                size='small'
                                                onChange={(e) => onNameChange(e.target.value)}
                                                id="entryName" label="Entry Name" variant="outlined" />
                                        </FormControl>
                                    </Grid>
                                ) : (
                                    <Grid item xs={4}>
                                        <FormControl fullWidth>
                                            <DatePickerValue
                                                onChange={onDateChange}
                                                label='Date'
                                            />
                                        </FormControl>
                                    </Grid>
                                )
                            }
                            <Grid item xs={12}>
                                <FormControl size='small' fullWidth>
                                    <Button onClick={() => refresh()} sx={{ px: 2 }} startIcon={<LoopIcon />} variant="contained">Refresh</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Toolbar>
        </Box>
    )
}

export default AdvancedSearch
