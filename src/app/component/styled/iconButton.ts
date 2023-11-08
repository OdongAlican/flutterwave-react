import {
    styled,
    IconButton,
} from '@mui/material';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    "&.MuiIconButton-root:hover i": {
        color: theme.palette.grey[50]
    }
}));
