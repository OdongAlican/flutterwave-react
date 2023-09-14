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
// import { Document, Page } from 'react-pdf';

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
      {documentContent && (
        <iframe
          src={`data:application/pdf;base64,${documentContent}`}
          title="Document"
          width="100%"
          style={{
            pointerEvents: iframeStyles.pointerEvents as any,
            userSelect: iframeStyles.userSelect as any,
            minHeight: '60vh'
          }}
        />
      )}  
      {/* {documentContent ? (
        <Document file={`data:application/pdf;base64,${atob(documentContent)}`}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Loading...</p>
      )} */}
    </Box>
  );
}
export default memo(DocumentViewer);
