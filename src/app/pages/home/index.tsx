import { Box } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "../../component/navigation/navBar";

const Home = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  )
}

export default Home;
