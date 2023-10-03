import {
  Box,
  Card
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { apiURL } from "../../../core/api/baseURL";
import { LoginContext } from "../../context/login";

const BookMarks = () => {

  const { currentUserData } = useContext(LoginContext);

  const fetchBookmarks = () => {
    axios.post(`${apiURL}payments/transactions/2`).then((response) => {
      console.log(response.data, "response data");
    }).catch((error: any) => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);
  
  return (
    <Box sx={{ px: 4 }}>
      <Card sx={{ pb: 2 }} >
        <Box
          sx={{ width: '100%', overflowX: 'auto', p: 4 }}
        >
          Bookmarks
        </Box>
      </Card>
    </Box>
  )
}

export default BookMarks;
