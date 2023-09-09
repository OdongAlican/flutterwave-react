import { GridColDef } from "@mui/x-data-grid";
import { RowTypography } from "../../component/dataGrid/dataGrid";
import { Button } from "@mui/material";
import { 
    convertStringToUpperCase, 
    formatDate 
} from "../../../utills/helpers";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { blue } from "@mui/material/colors";
import { IEntry } from "./interface";

const iconStyles = { color: blue[500], fontSize: 40 };

const ColumnComponent = () => {

    const viewEntry = (entry: IEntry) => console.log(entry, 'current entry!!');

 const columns: GridColDef[] = [
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
        field: 'name',
        headerName: 'Name',
        description: 'This column displays various canteen Name.',
        minWidth: 100,
        flex: 1,
        renderCell: params => {
            return (
                <RowTypography>
                    {convertStringToUpperCase(params.row.name)}
                </RowTypography>
            )
        }
    },
    {
        field: 'nodeType',
        headerName: 'Node Type',
        description: 'This column displays various canteen Node Types.',
        minWidth: 100,
        flex: 1,
        renderCell: params => {
            return (
                <RowTypography>
                    {params.row.nodeType}
                </RowTypography>
            )
        }
    },
    {
        field: 'id',
        headerName: 'Options',
        flex: 0.3,
        minWidth: 30,
        sortable: false,
        renderCell: params => (
            <Button
                sx={{ textTransform: 'none' }}
                onClick={() => viewEntry(params.row)}
                variant="outlined">Details</Button>
        )
    },
];
    return {
        columns
    }
}

export default ColumnComponent;