import
React, {
  useState,
  useEffect
} from 'react';
import {
  Box,
  Card
} from '@mui/material';
import { fetchDocuments } from './documents_api';
import { IEntry, IResponseData } from './interface';
import { StyledDataGrid } from '../../component/dataGrid/dataGrid';
import { entriesMocks } from '../../../utills/mocks';
import { columns } from './columns';

const ListDocuments = () => {
  const [entries, setEntries] = useState<Array<IEntry>>(entriesMocks);

  const getDocumentList = async () => {
    const data: IResponseData = await fetchDocuments();

    if (data?.status === 200
      && data.statusText === 'OK') {
      console.log(data, 'response stuff!!');
    }
  };

  useEffect(() => { getDocumentList(); }, []);
  useEffect(() => { setEntries(entriesMocks); }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ pb: 2 }} >
        <Box
          sx={{ width: '100%', overflowX: 'auto' }}
        >
          <StyledDataGrid
            {...entries}
            autoHeight
            rows={entries}
            // slots={{ footer: CustomGridToolBar }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
          // onRowDoubleClick={(e) => handleRowDoubleClick(e.row)}
          />
        </Box>
      </Card>
    </Box>
  )
}

export default ListDocuments;
