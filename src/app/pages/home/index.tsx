import { Box } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "../../component/navigation/navBar";
import Footer from "../../component/navigation/footer";
import LoginProvider from "../../context/login";

const Home = () => {
  return (
    <Box>
      <LoginProvider>
        <NavBar />
        <Outlet />
        <Footer />
      </LoginProvider>
    </Box>
  )
}

export default Home;
