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
import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/cjs/Page/AnnotationLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IDocumentViewer {
  entry: IEntry
}

const DocumentViewer = ({ entry }: IDocumentViewer) => {
  const [documentContent, setDocumentContent] = useState<any>(null);
  const [iframeStyles, setIframeStyles] = useState<{
    pointerEvents: string;
    userSelect: string;
  }>({
    pointerEvents: 'none',
    userSelect: 'none'
  })

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


  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  // const onDocumentLoadSuccess = () => console.log('something');
  const onDocumentLoadError = () => console.log('something');

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', py: 2 }}>
        <Typography>{entry.properties['cm:title']}</Typography>
        <Button
          onClick={() => {
            setIframeStyles({
              pointerEvents: '',
              userSelect: ''
            })
          }}
          sx={{ marginLeft: 'auto' }} variant='contained'>View Document</Button>
      </Box>
      {/* {documentContent && (
        <iframe
          id='my-iframe'
          src={`data:application/pdf;base64,${documentContent}`}
          title="Document"
          width="100%"
          style={{
            pointerEvents: iframeStyles.pointerEvents as any,
            userSelect: iframeStyles.userSelect as any,
            minHeight: '60vh'
          }}
        />
      )} */}
      {documentContent ? (
        <>
          <Document
            file={`data:application/pdf;base64,${documentContent}`}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
              Previous
            </button>
            <button
              type="button"
               disabled={pageNumber >= (numPages as number)}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
}
export default memo(DocumentViewer);
