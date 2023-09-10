import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../../core/routes/routes';

const SearchComponent = () => {
    const navigate = useNavigate();
  return (
    <Box>
        Search Area!!
      <Button onClick={() => navigate(ROUTES.LIST_DOCUMENTS)}>Search</Button>
    </Box>
  )
}

export default SearchComponent
