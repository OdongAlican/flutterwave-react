import React,
{
  memo,
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Stack,
  CircularProgress,
  IconButton,
  Typography,
  Grid
} from '@mui/material';
import {
  baseUrl,
  credentials
} from '../../../core/api/baseURL';
import { IEntry } from './interface';
import {
  Document,
  Page,
  pdfjs
} from 'react-pdf';
import 'react-pdf/dist/cjs/Page/AnnotationLayer.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styled from 'styled-components';
import ErrorModal from '../../component/modal/errorModal';
import { grey } from '@mui/material/colors';
pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IDocumentViewer { entry: IEntry; handleModalClose: () => void };

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

const DetailsSection = ({ title, value }: { title: string; value: string }) => (
  <Grid container xs={12} sx={{ mb: 1 }} px={1}>
    <Grid sx={{ fontWeight: 'bold', fontSize: '14px' }} item xs={4}>{title}:</Grid>
    <Grid sx={{ fontSize: '14px' }} item xs={8}>{value}</Grid>
  </Grid>
);

const DocumentViewer = ({ entry, handleModalClose }: IDocumentViewer) => {
  const [documentContent, setDocumentContent] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const apiUrl = `${baseUrl}nodes/{documentId}/content`;

    const headers = {
      Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`,
    };

    axios.get<ArrayBuffer>(apiUrl.replace('{documentId}', entry.id), { headers, responseType: 'arraybuffer' })
      .then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setDocumentContent(base64);
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
      });
  }, []);

  const changePage = (offset: number) => {
    if (pageNumber === 5 && offset > 0) return setOpen(true);

    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => { changePage(-1); }
  const nextPage = () => changePage(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', borderBottom: `1px solid ${grey[400]}` }}>
        <IconButton onClick={handleModalClose}>
          <HighlightOffIcon fontSize='medium' />
        </IconButton>
      </Box>
      {
        open ? (
          <ErrorModal open={open} handleClose={handleClose} />
        ) : null
      }
      {documentContent ? (
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ overflowY: 'auto', height: '500px', display: "flex", width: '70%' }}>
            <PDFDocumentWrapper>
              <Document
                file={`data:application/pdf;base64,${documentContent}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {
                  <Page
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    pageNumber={pageNumber} >
                    <p>{pageNumber} of {numPages}</p>
                    <Stack direction="row" spacing={2}>
                      <Button
                        disabled={pageNumber === 1 ? true : false}
                        size='small' variant='contained' type="button" onClick={previousPage}>
                        Previous
                      </Button>
                      <Button
                        size='small'
                        type="button"
                        onClick={nextPage}
                      >
                        Next
                      </Button>
                    </Stack>
                  </Page>
                }
              </Document>
            </PDFDocumentWrapper>
          </Box>
          <Box sx={{ width: "30%", height: '500px' }}>
            <Typography sx={{ textDecoration: 'underline', p: 1, fontWeight: 'bold', fontSize: '14px' }}>Details</Typography>
            <DetailsSection title='Title' value={entry.properties['cm:title']} />
            <DetailsSection title='Author' value={entry.properties['cm:author']} />
            <DetailsSection title='Parties' value={entry.properties['ldc:parties']} />
            <DetailsSection title='Judge' value={entry.properties['ldc:judge'][0]} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default memo(DocumentViewer);
