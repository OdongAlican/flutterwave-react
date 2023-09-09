import { GridColDef } from "@mui/x-data-grid";
import { RowTypography } from "../../component/dataGrid/dataGrid";
import { Button } from "@mui/material";
import { formatDate } from "../../../utills/helpers";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { blue } from "@mui/material/colors";

const iconStyles = { color: blue[500], fontSize: 40 };

export const columns: GridColDef[] = [
    {
        field: 'isFile',
        headerName: '',
        flex: 0.3,
        minWidth: 30,
        renderCell: params => {
            return (
                <RowTypography>
                    {params.row.isFile ? (
                        <TextSnippetIcon sx={iconStyles} />)
                        : <InsertDriveFileIcon sx={iconStyles} />}
                </RowTypography>
            )
        }
    },
    {
        field: 'createdAt',
        headerName: 'Date Created',
        flex: 1,
        minWidth: 100,
        renderCell: params => {
            return (
                <RowTypography>
                    {formatDate(params.row.createdAt)}
                </RowTypography>
            )
        }
    },
    {
        field: 'code',
        headerName: 'Code',
        description: 'This column displays various canteen codes.',
        minWidth: 100,
        flex: 1,
    },
    {
        field: 'category',
        headerName: 'Category',
        description: 'This column displays categories',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'id',
        headerName: 'Options',
        flex: 1,
        minWidth: 100,
        sortable: false,
        renderCell: params => (
            <Button
                sx={{ textTransform: 'none' }}
                // onClick={() => viewVendor(params.row)}
                variant="outlined">Details</Button>
        )
    },
];
