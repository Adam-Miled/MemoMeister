import React from "react";
import Folders from "./Pages/Folders/FoldersPage";
import Documents from "./Pages/Documents/DocumentsPage";
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ProfileInfo from "./Pages/Profile/ProfileInfo";
import BadgeIcon from '@mui/icons-material/Badge';
import { Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";

const routes = [
  {
    path: "/",
    name: "MemoMeister Coding Challenge",
    icon: null,
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    name: "MemoMeister Coding Challenge",
    icon: null,
    element: <HomePage />,
  },
  {
    path: "/folders",
    name: "Folders",
    icon: <FolderIcon />,
    element: <Folders />,
  },
  {
    path: "/documents",
    name: "Documents",
    icon: <InsertDriveFileIcon />,
    element: <Documents />,
  },

  {
    path: "/profile",
    name: "Profile",
    icon: <BadgeIcon />,
    element: <ProfileInfo />,
  }
];
export default routes;