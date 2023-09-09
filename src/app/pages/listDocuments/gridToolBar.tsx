import React, { useState } from 'react';
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

interface ICustomGridToolBar { entries: IEntry[] };

const CustomGridToolBar = ({ entries }: ICustomGridToolBar) => {
    const [filterState, setFilterState] = useState<string>('');

    const onChange = (text: string) => setFilterState(text);
    console.log(filterState, 'Filter state');

    return (
        <Box sx={{ p: 1 }}>
            <Toolbar>
                <Box style={{ flex: 1 }}>
                    <Grid container xs={12}>
                        <Grid item xs={12} md={6} display='flex' alignItems='center'>
                            <Typography sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                                {entries.length} Entries
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} md={6}>
                            <Grid item xs={3}>
                                <FormControl size='small' fullWidth>
                                    <SelectOption
                                        options={entriesColumns}
                                        label='Filter'
                                        onChange={onChange}
                                        id='filterEntries'
                                    />
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
