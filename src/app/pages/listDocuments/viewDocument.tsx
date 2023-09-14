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
pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IDocumentViewer {
  entry: IEntry
}

const DocumentViewer = ({ entry }: IDocumentViewer) => {
  const [documentContent, setDocumentContent] = useState<any>(null);

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

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage = () => { changePage(-1); }

  const nextPage = () => changePage(1);

  return (
    <Box>
      {documentContent ? (
        <Box>
          <Document
            file={`data:application/pdf;base64,${documentContent}`}
          >
            {
              Array.from(new Array(numPages), (el, index) => (
                <Page
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  key={`page_${index + 1}`}
                  pageNumber={pageNumber} >
                  <div>
                    <p>{pageNumber}</p>
                    <button type="button" onClick={previousPage}>
                      Previous
                    </button>
                    <button
                      type="button"
                      // disabled={pageNumber >= (numPages as number)}
                      onClick={nextPage}
                    >
                      Next
                    </button>
                  </div>
                </Page>
              ))
            }
            {/* <Page 
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
              */}
          </Document>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
}
export default memo(DocumentViewer);
