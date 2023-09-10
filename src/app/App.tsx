import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../core/routes/appRoutes";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box>
      <Router>
        <AppRoutes />
      </Router>
    </Box>
  );
}

export default App;
