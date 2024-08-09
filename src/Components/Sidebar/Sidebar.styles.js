export const styles = {
  ClosedMenu: {
    width: "60px",
    height: "100vh",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  ExpandedMenu: {
    width: "224px",
    height: "100vh",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  MenuContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  List: {
    minHeight: 48,
    justifyContent: "center",
    px: 2.5,
    margin: "4px 0",
    "&.Mui-selected": {
      backgroundColor: '#0e6adb"',
      color: "white",
    },
  },
  Icon: {
    minWidth: 0,
    justifyContent: "center",
  },
  Link: {
    textDecoration: "none",
    color: "black",
  },
  ListItemText: {
    color: "#000000",
  },
  Divider: {
    margin: "0 8px",
  },
  LastItem: {
    marginBottom: "120px",
  },
};
