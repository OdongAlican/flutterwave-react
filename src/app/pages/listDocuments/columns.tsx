import { GridColDef } from "@mui/x-data-grid";
import { RowTypography } from "../../component/dataGrid/dataGrid";
import { Button } from "@mui/material";
import { IEntry } from "./interface";
import { useState } from "react";
import { entriesMocks } from "../../../utills/mocks";
import { crudState } from "../../../utills/constants";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { blue } from "@mui/material/colors";

const ColumnComponent = () => {
    const [entry, setEntry] = useState<IEntry>(entriesMocks[0]);
    const [state, setState] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
    const viewEntry = (entry: IEntry) => {
        setEntry(entry);
        setState(crudState.read.value);
        setOpen(true);
    }

    const columns: GridColDef[] = [
        {
            field: 'documentTitle',
            headerName: 'Name',
            description: 'This column displays document title.',
            flex: 1.5,
            minWidth: 150,
            renderCell: params => {
                return (
                    <RowTypography sx={{ color: blue[500], textTransform: 'uppercase' }}>
                        <InsertDriveFileIcon fontSize="small" sx={{ color: blue[500], fontSize: '13px', mr: 0.5 }} />
                        {params.row.properties['cm:title']}
                    </RowTypography>
                )
            }
        },
        {
            field: 'court',
            headerName: 'Court',
            description: 'This column displays the Court name',
            flex: 1,
            minWidth: 100,
            renderCell: params => {
                return (
                    <RowTypography sx={{ textTransform: 'uppercase', fontSize: "13px" }}>
                        {params.row.properties["ldc:court"]}
                    </RowTypography>
                )
            }
        },
        {
            field: 'parties',
            headerName: 'Parties',
            description: 'This column displays the Parties',
            flex: 1.5,
            minWidth: 150,
            renderCell: params => {
                return (
                    <RowTypography>
                        {params.row.properties["ldc:parties"]}
                    </RowTypography>
                )
            }
        },
        {
            field: 'judge',
            headerName: 'Judge',
            description: 'This column displays the Judge name',
            flex: 1,
            minWidth: 100,
            renderCell: params => {
                return (
                    <RowTypography>
                        {params.row.properties["ldc:judge"]}
                    </RowTypography>
                )
            }
        },
        {
            field: 'subject',
            headerName: 'Subject',
            description: 'This column displays the Subject Matter',
            flex: 0.8,
            minWidth: 80,
            renderCell: params => {
                return (
                    <RowTypography>
                        {params.row.properties["ldc:subjectMatter"]}
                    </RowTypography>
                )
            }
        },
        {
            field: 'judgementDate',
            headerName: 'Judgement Date',
            description: 'This column displays the Judgement Date',
            flex: 1,
            minWidth: 100,
            renderCell: params => {
                return (
                    <RowTypography>
                        {params.row.properties["ldc:judgementDate"]}
                    </RowTypography>
                )
            }
        },
        {
            field: 'id',
            headerName: 'Options',
            flex: 0.7,
            minWidth: 70,
            sortable: false,
            renderCell: params => (
                <Button
                    sx={{ textTransform: 'none' }}
                    onClick={() => viewEntry(params.row)}
                    variant="outlined">View</Button>
            )
        },
    ];
    return {
        columns,
        entry,
        state,
        open,
        handleClose
    }
}

export default ColumnComponent;