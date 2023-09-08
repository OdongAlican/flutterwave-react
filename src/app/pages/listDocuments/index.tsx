import React from 'react';
import { useEffect } from 'react';
import { Typography } from '@mui/material'
import { fetchDocuments } from './documents_api';
import { IResponseData } from './interface';

const ListDocuments = () => {
  const getDocumentList = async () => {
    const data: IResponseData = await fetchDocuments();

    if (data?.status === 200
      && data.statusText === 'OK') {
      console.log(data, 'response stuff!!');
    }
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
