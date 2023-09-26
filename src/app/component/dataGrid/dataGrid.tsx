
import { Typography, styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    borderRadius: '0px !important',
    display: "flex",
    "& .MuiDataGrid-columnHeaders": {
        fontSize: 15,
        borderTop: "0.6px solid rgba(0,0,0,0.05) !important",
    },
    "& .MuiDataGrid-row": {
        "&:hover": {
            cursor: "pointer"
        }
    },
    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: '600 !important',
        color: theme.palette.grey[900]
    },
    '&>.MuiDataGrid-main': {
        '&>.MuiDataGrid-columnHeaders': {
            borderBottom: `1px solid${theme.palette.grey[300]}`,
            borderTop: `1px solid${theme.palette.grey[300]} !important`,
            borderRadius: '0px',
        }, '& div div div div >.MuiDataGrid-cell': {
            borderBottom: `1px solid${theme.palette.grey[100]}`,
        },
    },
    '&.MuiDataGrid-root': {
        border: 'none',
        borderTop: `1px solid${theme.palette.grey[300]} !important`,
    },
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
        outline: "none !important",
    },
    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus': {
        outline: 'none !important',
    },
}));

export const RowTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[800],
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19.07px'
}));
