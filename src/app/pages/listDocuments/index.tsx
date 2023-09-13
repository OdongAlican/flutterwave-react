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
import CustomGridToolBar from './gridToolBar';
import {
  formatDate,
  searchTableData
} from '../../../utills/helpers';
import { Dayjs } from 'dayjs';
import { useParams } from 'react-router';
import { IEntriesState } from './documents_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store';
import {
  crudState,
  entriesColumns
} from '../../../utills/constants';
import ModalComponent from '../../component/modal';
import DocumentViewer from './viewDocument';

const ListDocuments = () => {
  const { data }: IEntriesState = useSelector((state: RootState) => state?.entryState);

  const [entries, setEntries] = useState<Array<IEntry>>(entriesMocks);
  const [filterState, setFilterState] = useState<string>(entriesColumns[0].value);
  const [filteredEntries, setFilteredEntries] = useState<Array<IEntry>>(entriesMocks);
  const { query } = useParams();

  const {
    columns,
    entry,
    state,
    open,
    handleClose
  } = ColumnComponent();

  const onColumnNameChange = (text: string) => setFilterState(text);

  const getDocumentList = async () => {
    const data: IResponseData = await fetchDocuments(((query || "")));

    if (data?.status === 200
      && data.statusText === 'OK') {
      setEntries(() => {
        return data.data.list.entries.map((entry) => entry.entry)
      });
    }
  };

  useEffect(() => setEntries(data), [data])
  useEffect(() => { getDocumentList(); }, []);
  useEffect(() => { setFilteredEntries(entries) }, [entries]);
  const onNameChange = (text: string) => setFilteredEntries(searchTableData(text, filterState, entries));
  const refresh = () => setFilteredEntries(entries);
  const onDateChange = (date: Dayjs | null) => {
    const filterValue = formatDate(date?.format() as string).split(' ')[0];
    setFilteredEntries(searchTableData(filterValue, filterState, entries));
  };

  return (
    <Box sx={{ px: 4 }}>
      {
        state === crudState.read.value ? (
          <ModalComponent open={open} handleClose={handleClose} >
            <DocumentViewer entry={entry} />
          </ModalComponent>
        ) : null
      }
      <Card sx={{ pb: 2 }} >
        <Box
          sx={{ width: '100%', overflowX: 'auto' }}
        >
          <StyledDataGrid
            {...filteredEntries}
            autoHeight
            rows={filteredEntries}
            slots={{ toolbar: CustomGridToolBar }}
            slotProps={{
              toolbar: {
                filteredEntries,
                onNameChange,
                onDateChange,
                refresh,
                onColumnNameChange,
                filterState
              }
            }}
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
