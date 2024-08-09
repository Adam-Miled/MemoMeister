import { Box, List } from "@mui/material";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { styles } from "./Sidebar.styles";

export default function Sidebar({
  activePage,
  isSidebarExpanded,
  closeSidebar,
}) {
  return (
    <Box sx={isSidebarExpanded ? styles.ExpandedMenu : styles.ClosedMenu}>
      <Box sx={styles.MenuContainer}>
        <List sx={{ flex: 1 }}>
          {routes.slice(0, -1).map(
            (route, index) =>
              route.icon && (
                <React.Fragment key={index}>
                  <Tooltip title={route.name} placement="right" arrow onClick={()=>closeSidebar()}>
                    <Link to={route.path} style={styles.Link}>
                      <ListItemButton
                        sx={styles.List}
                        selected={activePage === route.name}
                      >
                        <ListItemIcon
                          sx={{
                            ...styles.Icon,
                            mr: isSidebarExpanded ? 3 : "auto",
                          }}
                        >
                          {route.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={route.name}
                          sx={{
                            ...styles.ListItemText,
                            opacity: isSidebarExpanded ? 1 : 0,
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  </Tooltip>
                  <Divider sx={styles.Divider} />
                </React.Fragment>
              )
          )}
        </List>
        <Box sx={styles.LastItem}>
          <Divider sx={styles.Divider} />
          <Tooltip
            title={routes[routes.length - 1].name}
            placement="right"
            arrow
            onClick={()=>closeSidebar()}
          >
            <Link to={routes[routes.length - 1].path} style={styles.Link}>
              <ListItemButton
                sx={styles.List}
                selected={activePage === routes[routes.length - 1].name}
              >
                <ListItemIcon
                  sx={{
                    ...styles.Icon,
                    mr: isSidebarExpanded ? 3 : "auto",
                  }}
                >
                  {routes[routes.length - 1].icon}
                </ListItemIcon>
                <ListItemText
                  primary={routes[routes.length - 1].name}
                  sx={{
                    ...styles.ListItemText,
                    opacity: isSidebarExpanded ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </Link>
          </Tooltip>
          <Divider sx={styles.Divider} />
        </Box>
      </Box>
    </Box>
  );
}