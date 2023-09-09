import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface IDatePickerValue {
    label: string;
    onChange: (date: Dayjs | null) => void;
}

export default function DatePickerValue({ label, onChange }: IDatePickerValue) {

    const [formattedDate, setFormattedDate] = React.useState<string>('');
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(''));

    const getCurrentDate = () => {

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        setFormattedDate(`${year}-${month}-${day}`);
    }

    React.useEffect(() => { getCurrentDate() }, []);
    React.useEffect(() => { setValue(dayjs(formattedDate)) }, [formattedDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format="DD-MM-YYYY"
                slotProps={{ textField: { size: 'small' } }}
                sx={{ width: '100%' }}
                label={label}
                value={value}
                onChange={(event) => { onChange(event) }}
            />
        </LocalizationProvider>
    );
}
