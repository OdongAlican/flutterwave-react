import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../core/routes/appRoutes";
import { Box } from "@mui/material";
import Background from '../assets/images/law.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const styles = {
  container: {
    position: 'relative',
    height: '100%',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${Background})`,
  },
};

const App = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.overlay}>
        <Box sx={{
          ...styles.backgroundImage
        }}>
          <ToastContainer />
          <Router>
            <AppRoutes />
          </Router>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
