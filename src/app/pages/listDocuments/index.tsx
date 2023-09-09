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
import {
  IEntry,
  IResponseData
} from './interface';
import { StyledDataGrid } from '../../component/dataGrid/dataGrid';
import { entriesMocks } from '../../../utills/mocks';
import ColumnComponent from './columns';

const ListDocuments = () => {
  const [entries, setEntries] = useState<Array<IEntry>>(entriesMocks);
  const { columns } = ColumnComponent();

  const getDocumentList = async () => {
    const data: IResponseData = await fetchDocuments();

    if (data?.status === 200
      && data.statusText === 'OK') {
      setEntries(() => {
        return data.data.list.entries.map((entry) => entry.entry)
      });
    }
  };

  useEffect(() => { getDocumentList(); }, []);

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
            // slots={{ columnHeaders: CustomGridToolBar }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
          />
        </Box>
      </Card>
    </Box>
  )
}

export default ListDocuments;
