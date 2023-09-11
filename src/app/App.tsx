import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../core/routes/appRoutes";
import { Box } from "@mui/material";
import Background from '../assets/images/law.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Box sx={{
      height: '100%',
      backgroundImage: `url(${Background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%'
    }}>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </Box>
  );
}

export default App;
