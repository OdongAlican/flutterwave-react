import {
  Box,
  Card,
  Typography
} from "@mui/material";
import axios from "axios";
import {
  useEffect,
  useState
} from "react";
import { apiURL } from "../../../core/api/baseURL";
import { StyledDataGrid } from "../../component/dataGrid/dataGrid";
import CustomRowOverlay from "../../component/dataGrid/customRowOverlay";
import { IDocument } from "../documents/interface";
import ColumnComponent from "../documents/columns";

const BookMarks = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);

  const {
    columns,
    // state,
    // open,
    // handleClose,
    entry
  } = ColumnComponent();

  const fetchBookmarks = () => {
    axios.post(`${apiURL}payments/bookmarks/2`).then((response) => {
      console.log(response.data, "response data");
    }).catch((error: any) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchBookmarks();
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
          My Bookmarks
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
              slots={{
                noRowsOverlay: CustomRowOverlay
              }}
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

export default BookMarks;
