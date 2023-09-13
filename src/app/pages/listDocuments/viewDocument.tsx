import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../core/api/baseURL';
import { IEntry } from './interface';

interface IDocumentViewer {
  entry: IEntry
}

const DocumentViewer = ({ entry }: IDocumentViewer) => {
  const [documentContent, setDocumentContent] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const apiUrl = `${baseUrl}nodes/{documentId}/content`;

    const documentId = entry.id;

    const username = 'admin';
    const password = 'admin';

    const headers = {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    };

    axios.get<ArrayBuffer>(apiUrl.replace('{documentId}', documentId), { headers, responseType: 'arraybuffer' })
      .then((response) => {
        setDocumentContent(new Uint8Array(response.data));
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
      });
  }, []);

  return (
    <div>
      <h2>Document Viewer</h2>
      {documentContent && (
        <iframe
               src={`data:application/pdf;base64,${btoa(String.fromCharCode(...Array.from(documentContent)))}`}
               title="Document"
               width="100%"
               height="600px"
               style={{
                pointerEvents: 'none',
                userSelect: 'none',
              }}
             />
      )}
    </div>
  );
}
export default DocumentViewer
