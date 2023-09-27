import React from 'react';
import {
    Select,
    MenuItem,
    SelectChangeEvent,
    Box,
    InputLabel
} from '@mui/material';

interface ISelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    options: ISelectOption[];
    label: string;
    onChange: (value: string, name: string) => void;
    id: string;
    name?: string
}

const SelectOption: React.FC<SelectProps> = ({ options, label, onChange, id, name }) => {
    const handleChange = (event: SelectChangeEvent<string>, name: string) => {
        onChange(event.target.value as string, name);
    };

    const determineAttributes = (option: ISelectOption, attr: string) => {
        if ('value' in option) {
            return attr === 'label' ? option.label : option.value
        }
    }

    return (
        <Box component='div' sx={{ width: '100%' }}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                name={name}
                sx={{ width: '100%' }}
                label={label}
                id={id}
                onChange={(e: any) => handleChange(e, (name as string))}>
                {options.map((option) => (
                    <MenuItem
                        key={determineAttributes(option, 'key')}
                        value={determineAttributes(option, 'value')}>
                        {determineAttributes(option, 'label')}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default SelectOption;
