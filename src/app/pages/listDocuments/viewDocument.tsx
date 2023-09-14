import React,
{
  memo,
  useEffect,
  useState
} from 'react';
import axios from 'axios';
import {
  baseUrl,
  credentials
} from '../../../core/api/baseURL';
import { IEntry } from './interface';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/cjs/Page/AnnotationLayer.css'
import { Box } from '@mui/material';
import ErrorModal from '../../component/modal/errorModal';
pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IDocumentViewer {
  entry: IEntry
}

const DocumentViewer = ({ entry }: IDocumentViewer) => {
  const [documentContent, setDocumentContent] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState<boolean>(false);

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
        console.log(base64, "base64!!!");
        setDocumentContent(base64);
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
      });
  }, []);



  const changePage = (offset: number) => {
    if (pageNumber === 3) return setOpen(true);

    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => { changePage(-1); }

  const nextPage = () => changePage(1);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleClose = () => setOpen(false);

  return (
    <Box>{
      open ? (
        <ErrorModal open={open} handleClose={handleClose} />
      ) : null
    }
      {documentContent ? (
        <Box sx={{ bgcolor: 'teal' }}>
          <Document
            file={`data:application/pdf;base64,${documentContent}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {
              <Page
                renderTextLayer={false}
                renderAnnotationLayer={false}
                pageNumber={pageNumber} >
                <div>
                  <p>{pageNumber} of {numPages}</p>
                  <button type="button" onClick={previousPage}>
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextPage}
                  >
                    Next
                  </button>
                </div>
              </Page>
            }
          </Document>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
}
export default memo(DocumentViewer);
