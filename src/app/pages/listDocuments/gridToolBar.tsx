import React, { useState } from 'react';
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

const CustomGridToolBar = ({ filteredEntries, onNameChange, onDateChange, refresh }: ICustomGridToolBar) => {
    const [filterState, setFilterState] = useState<string>('name');
    const onChange = (text: string) => setFilterState(text);

    return (
        <Box sx={{ p: 1 }}>
            <Toolbar>
                <Box style={{ flex: 1 }}>
                    <Grid container xs={12}>
                        <Grid item xs={12} md={5} display='flex' alignItems='center'>
                            <Typography sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                                {filteredEntries.length} Entries
                            </Typography>
                        </Grid>
                        <Grid spacing={3} container item xs={12} md={7}>
                            <Grid item xs={4}>
                                <FormControl size='small' fullWidth>
                                    <SelectOption
                                        options={entriesColumns}
                                        label='Filter by'
                                        onChange={onChange}
                                        id='filterEntries'
                                    />
                                </FormControl>
                            </Grid>
                            {
                                filterState === 'name' ? (
                                    <Grid item xs={4}>
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
                            <Grid item xs={4}>
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

export default CustomGridToolBar;
