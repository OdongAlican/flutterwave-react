import { GridColDef } from "@mui/x-data-grid";
import { RowTypography } from "../../component/dataGrid/dataGrid";
import { Button } from "@mui/material";
import { useState } from "react";
import { IEntry } from "../listDocuments/interface";
import { entriesMocks } from "../../../utills/mocks";
import { crudState } from "../../../utills/constants";
import { fetchSingleDocument } from "../listDocuments/documents_api";

const ColumnComponent = () => {
    const [state, setState] = useState<string>('');
    const [entry, setEntry] = useState<IEntry>(entriesMocks[0]);
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => setOpen(false);

    const viewEntry = async (entry: IEntry) => {
        const id = entry?.documentId as string
        const response = await fetchSingleDocument(id);

        setEntry(response);
        setState(crudState.read.value);
        setOpen(true);
    }

    const columns: GridColDef[] = [
        {
            field: 'documentName',
            headerName: 'Document Name',
            description: 'This column displays document name.',
            flex: 1.5,
            minWidth: 150,
            renderCell: params => {
                return (
                    <RowTypography>
                        {params.row.documentName}
                    </RowTypography>
                )
            }
        },
        {
            field: 'amount',
            headerName: 'Amount',
            description: 'This column displays the amount',
            flex: 1,
            minWidth: 100,
            renderCell: params => {
                return (
                    <RowTypography>
                        {params.row.amount}
                    </RowTypography>
                )
            }
        },
        {
            field: 'dateOfPurchase',
            headerName: 'Date Of Purchase',
            description: 'This column displays the date of purchase',
            flex: 1,
            minWidth: 100,
            renderCell: params => {
                return (
                    <RowTypography>
                        {params.row.dateOfPurchase}
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
                    variant="outlined">Details</Button>
            )
        },
    ];
    return {
        columns,
        state,
        open,
        handleClose,
        entry
    }
}

export default ColumnComponent;