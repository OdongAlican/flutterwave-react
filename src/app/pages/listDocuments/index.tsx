import
React, {
  useState,
  useEffect
} from 'react';
import {
  Box,
  Button,
  Card,
  InputAdornment,
  Typography
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
  determineSearchKey,
  filterDataTableAdvanced,
  formatDate,
  searchTableData
} from '../../../utills/helpers';
import { Dayjs } from 'dayjs';
import { useParams } from 'react-router';
import { IEntriesState, loadData } from './documents_slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../core/store';
import {
  crudState,
  entriesColumns
} from '../../../utills/constants';
import ModalComponent from '../../component/modal';
import DocumentViewer from './viewDocument';
import AdvancedSearch from './advancedSearch';
import { toast } from 'react-toastify';
import { BootstrapInput } from '../../component/form/input';
import { blue } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';


const initialAdvancedSreachState = {
  docType: '',
  court: '',
  judge: '',
  parties: '',
  year: ''
}

const ListDocuments = () => {
  const { data }: IEntriesState = useSelector((state: RootState) => state?.entryState);

  const [entries, setEntries] = useState<Array<IEntry>>(entriesMocks);
  const [filterState, setFilterState] = useState<string>(entriesColumns[0].value);
  const [filteredEntries, setFilteredEntries] = useState<Array<IEntry>>(entriesMocks);
  const [inputValue, setInputValues] = useState<string>('');
  const { query } = useParams();
  const dispatch = useDispatch();
  const [advancedSearchState, setAdvancedSearchState] = useState<{
    docType: string;
    court: string;
    judge: string;
    parties: string;
    year: string;
  }>(initialAdvancedSreachState)

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

  const handleSelectChange = (value: string, name: string) => {
    setAdvancedSearchState(
      { ...advancedSearchState, [name]: value }
    )
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setAdvancedSearchState(
      { ...advancedSearchState, [name]: value }
    )
  };

  const filterCurrentData = () => {
    setFilteredEntries(filterDataTableAdvanced(advancedSearchState, filteredEntries))
  }

  const onSubmit = async (from: string) => {
    /**
     - Search the content with the first data in the object.
     - Then filter the response with the result retrieved.
     */
    const data: IResponseData = await fetchDocuments(
      from === 'top' ? (inputValue as string)
        : determineSearchKey(advancedSearchState));

    if (data?.status === 200
      && data.statusText === 'OK') {
      const res = data.data.list.entries.map((entry) => entry.entry);
      dispatch(loadData(res));
      if (res.length === 0) {
        return toast.error('Content does not exist');
      }
    }
  };

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
          Law Development Center
          Online Directory
          Advanced Search
        </Typography>
        <BootstrapInput
          style={{ width: '65%' }}
          onChange={(e: any) => setInputValues(e.target.value)}
          placeholder={`Search Document`}
          InputProps={{
            style: {
              height: '90px',
              padding: 0,
              backgroundColor: '#fff',
              paddingRight: '25px',
              paddingLeft: '15px',
            },
            endAdornment: <InputAdornment position="end">
              <Button
                type='button'
                variant='contained'
                onClick={() => onSubmit('top')}
                sx={{
                  width: '100px',
                  borderRadius: 25,
                  textTransform: 'none',
                  height: '45px',
                  background: blue[400]
                }}
              >
                Search
              </Button>
            </InputAdornment>,
            startAdornment: <InputAdornment position='end' >
              <SearchIcon fontSize='small' sx={{ mx: 1 }} />
            </InputAdornment>
          }}
          id='query'
          variant="outlined"
        />
      </Box>
      <Box sx={{ bgcolor: '#FFF' }}>
        {
          state === crudState.read.value ? (
            <ModalComponent open={open} handleClose={handleClose} >
              <DocumentViewer handleModalClose={handleClose} entry={entry} />
            </ModalComponent>
          ) : null
        }

        <Card sx={{ pb: 2, display: 'flex' }} >
          <Box
            sx={{ width: '70%', overflowX: 'auto' }}
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
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 15]}

            />
          </Box>
          <Box
            sx={(theme) => ({
              p: 2,
              width: '30%',
              borderLeft: `1px solid ${theme.palette.grey[300]}`
            })}>
            <AdvancedSearch
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              onSubmit={() => filterCurrentData()}
            />
          </Box>
        </Card>
      </Box>
    </>
  )
}

export default ListDocuments;
