import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    Box,
    Card,
    Typography
} from '@mui/material'
import { LoginContext } from '../../context/login';
import axios from 'axios';
import { apiURL } from '../../../core/api/baseURL';
import { IEntriesState } from '../listDocuments/documents_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store';
import { StyledDataGrid } from '../../component/dataGrid/dataGrid';
import { IDocument } from './interface';
import ColumnComponent from './columns';


const MyDocuments = () => {
    const { data }: IEntriesState = useSelector((state: RootState) => state?.entryState);
    const [documents, setDocuments] = useState<IDocument[]>([]);
    const { currentUserData } = useContext(LoginContext);

    const { columns } = ColumnComponent();

    const fetchDocuments = () => {
        axios.get(`${apiURL}payments/transactions/1`).then((response) => {
            console.log(response.data, "response data");
            setDocuments(response.data);
        }).catch((error: any) => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (

        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: "column",
                my: 3,
            }}>
                <Typography sx={{
                    mr: 2, fontSize: '3rem',
                    fontWeight: 700, color: '#FFF',
                    textAlign: 'center',
                    width: '65%'
                }}>
                    My Documents
                </Typography>
            </Box>
            <Box sx={{ bgcolor: '#FFF' }}>
                {/* {
        state === crudState.read.value ? (
          <ModalComponent open={open} handleClose={handleClose} >
            <DocumentViewer handleModalClose={handleClose} entry={entry} />
          </ModalComponent>
        ) : null
      } */}

                <Card sx={{ pb: 2, display: 'flex' }}>
                    <Box sx={{ width: '100%', overflowX: 'auto' }}>
                        <StyledDataGrid
                            {...documents}
                            autoHeight
                            rows={documents}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 15]}

                        />
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default MyDocuments;
