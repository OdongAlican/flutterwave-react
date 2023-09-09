import React, { useMemo, useState } from 'react';
import {
    Box,
    FormControl,
    Grid,
    Toolbar,
    Typography
} from '@mui/material';
import { IEntry } from './interface';
import SelectOption from '../../component/form/selectOptions';
import { entriesColumns } from '../../../utills/constants';
import { BootstrapInput } from '../../component/form/input';
import DatePickerValue from '../../component/form/datePicker';
import { Dayjs } from 'dayjs';
import { searchTableData } from '../../../utills/helpers';

interface ICustomGridToolBar { entries: IEntry[] };

const CustomGridToolBar = ({ entries }: ICustomGridToolBar) => {
    const [filterState, setFilterState] = useState<string>('name');
    const [entryList, setEntryList] = useState<IEntry[]>(entries);

    useMemo(() => setEntryList(entries), [entries]);

    const onChange = (text: string) => setFilterState(text);
    const handleChange = (text: string) => {
        const result = searchTableData(text, entries);
        setEntryList(result);
    }
    const onDateChange = (date: Dayjs | null) => console.log(date, 'date')

    return (
        <Box sx={{ p: 1 }}>
            <Toolbar>
                <Box style={{ flex: 1 }}>
                    <Grid container xs={12}>
                        <Grid item xs={12} md={7} display='flex' alignItems='center'>
                            <Typography sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                                {entryList.length} Entries
                            </Typography>
                        </Grid>
                        <Grid spacing={3} container item xs={12} md={5}>
                            <Grid item xs={6}>
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
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <BootstrapInput
                                                size='small'
                                                onChange={(e) => handleChange(e.target.value)}
                                                id="entryName" label="Entry Name" variant="outlined" />
                                        </FormControl>
                                    </Grid>
                                ) : (
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <DatePickerValue
                                                onChange={onDateChange}
                                                label='Date'
                                            />
                                        </FormControl>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Toolbar>
        </Box>
    )
}

export default CustomGridToolBar;
