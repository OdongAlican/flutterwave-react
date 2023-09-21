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
  Grid,
  Tooltip,
  Avatar
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
import AuthModal from '../../component/modal/authModal';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { blue, grey } from '@mui/material/colors';
import Logo from '../../../assets/images/Logo.png';
import Login from '../authentication/login';
import { authComponents } from '../../../utills/constants';
import SignUp from '../authentication/signUp';
import { getAuthTokenFromSessionStorage } from '../../../utills/session';
import Flutterwave from '../flutterwave';
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
  const [component, setComponent] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>("");

  const handleClose = () => setOpen(false);
  const setAccessTokenFxn = (token: string) => {
    setAccessToken(token);
  }

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
    if (accessToken?.length === 0 &&
      pageNumber === 3 && offset > 0) {
      setComponent(authComponents.login);
      setOpen(true);
      return;
    };
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const activeModalFxn = () => setComponent(authComponents.register);

  const previousPage = () => { changePage(-1); }
  const nextPage = () => changePage(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const handleDownloadLinkClick = () => {
    if (documentContent) {
      const linkSource = `data:application/pdf;base64,${documentContent}`;
      const downloadLink = document.createElement("a");
      const fileName = `${entry.properties['cm:title']}.pdf`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  useEffect(() => {
    const data: string = getAuthTokenFromSessionStorage() as string;
    setAccessToken(data);
  }, []);

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', borderBottom: `1px solid ${grey[400]}`, justifyContent: 'space-between' }}>
        <Avatar alt="LDC" src={Logo} />
        <Box>
          {accessToken?.length === 0 && <Tooltip title="Download document">
            <IconButton onClick={handleDownloadLinkClick}>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>}
          <Tooltip title="Close Preview">
            <IconButton onClick={handleModalClose}>
              <HighlightOffIcon fontSize='medium' />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {
        open ? (
          <AuthModal open={open}
            handleClose={handleClose}
            component={`${component === authComponents.register ? authComponents.register : authComponents.login
              }`} >
            {component === authComponents.login ?
              <Login
                setAccessTokenFxn={setAccessTokenFxn}
                setRegisterModal={activeModalFxn}
                handleClose={handleClose} />
              : <SignUp />
            }
          </AuthModal>
        ) : null
      }
      {documentContent &&
        (entry.content.mimeType === "application/pdf") ? (
        <>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ overflowY: 'auto', height: '400px', display: "flex", width: '70%' }}>
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
            <Box sx={{ width: "30%", height: '400px' }}>
              <Typography sx={{ textDecoration: 'underline', p: 1, fontWeight: 'bold', fontSize: '14px' }}>Details</Typography>
              <DetailsSection title='Title' value={entry.properties['cm:title']} />
              <DetailsSection title='Author' value={entry.properties['cm:author']} />
              <DetailsSection title='Parties' value={entry.properties['ldc:parties']} />
              <DetailsSection title='Judge' value={entry.properties['ldc:judge']?.[0]} />
            </Box>
          </Box>
          {accessToken?.length === 0 && <Stack
            direction='row'
            sx={{
              bgcolor: grey[100],
              mt: 1,
              p: 2,
              display: 'flex',
              alignItems: 'center'
            }}>
            <Typography sx={{ fontSize: "15px", fontWeight: "bold", py: 1 }}>
              Enjoying this preview? Purchase document to read the full content.
              <Typography sx={{ fontSize: '13px', color: blue[600], mt: 1 }}>Already purchased? <Button size='small' variant='contained' sx={{ height: '25px', textTransform: 'none', mx: 1 }} >Log In</Button></Typography>
            </Typography>
            <Button size='small' sx={{ ml: 'auto', height: '35px' }} variant='contained'>Purchase Document</Button>
            <Flutterwave />
          </Stack>}
        </>
      ) : documentContent &&
        (entry.content.mimeType !== "application/pdf") ? (
        <Box sx={{ display: 'flex', p: 4, alignItems: 'center', justifyContent: 'center' }}>
          Preview is only available for PDF Documents
        </Box>
      ) : (
        <Box sx={{ display: 'flex', p: 4, alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default memo(DocumentViewer);