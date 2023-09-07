import { useEffect } from 'react';
import { Typography } from '@mui/material'
import { fetchDocuments } from './documents_api';

const ListDocuments = () => {
  const getDocumentList = async () => {
    const data = await fetchDocuments();
    console.log(data, "server data!!");
  };

  useEffect(() => {
    getDocumentList();
  }, []);

  return (
    <div>
      <Typography>List Docs</Typography>
    </div>
  )
}

export default ListDocuments;
