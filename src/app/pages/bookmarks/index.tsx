import { 
  Box, 
  Card 
} from "@mui/material";

const BookMarks = () => {
  return (
    <Box sx={{ px: 4 }}>
      <Card sx={{ pb: 2 }} >
        <Box
          sx={{ width: '100%', overflowX: 'auto' }}
        >
          Bookmarks
        </Box>
      </Card>
    </Box>
  )
}

export default BookMarks;
