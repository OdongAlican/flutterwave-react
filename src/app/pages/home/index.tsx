import { Box } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "../../component/navigation/navBar";
import Footer from "../../component/navigation/footer";

const Home = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default Home;
