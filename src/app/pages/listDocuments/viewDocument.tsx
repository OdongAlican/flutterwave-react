import React,
{
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

interface IDocumentViewer {
  entry: IEntry
}

const DocumentViewer = ({ entry }: IDocumentViewer) => {
  const [documentContent, setDocumentContent] = useState<Uint8Array | null>(null);
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
        setDocumentContent(new Uint8Array(response.data));
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
      });
  }, []);

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', py: 2 }}>
        <Typography>{entry.name}</Typography>
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
          src={`data:application/pdf;base64,${btoa(String.fromCharCode(...Array.from(documentContent)))}`}
          title="Document"
          width="100%"
          height="600px"
          style={{
            pointerEvents: iframeStyles.pointerEvents as any,
            userSelect: iframeStyles.userSelect as any,
          }}
        />
      )}
    </Box>
  );
}
export default DocumentViewer;
