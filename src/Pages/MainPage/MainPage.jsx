import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { styles } from "./MainPage.styles";

function MainPage({ setIsAuthenticated, title }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const closeSidebar = () => {
    setIsSidebarExpanded(false);
  };

  return (
    <Box sx={styles.ContentWrapper}>
      <Header
        setIsAuthenticated={setIsAuthenticated}
        toggleSidebar={toggleSidebar}
      />
      <Box sx={styles.MainContent}>
        <Box sx={styles.Sidebar}>
          <Sidebar closeSidebar={closeSidebar} activePage={title} isSidebarExpanded={isSidebarExpanded} />
        </Box>
        <Box sx={styles.OutletWrapper}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
