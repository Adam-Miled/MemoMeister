export const styles = {
  Wrapper:{
    width: "fite-content",
    height: "fite-content",
    textDecoration: "none"
  },
  ButtonBox: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "240px",
    height: "240px",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    color: "#0e6adb",
    fontWeight: "600",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textDecoration: "none",
    transition: "background-color 0.2s, border 0.1s, color 0.1s, width 0.2s, height 0.2s",
    "&:hover": {
      color: "#ffffff",
      width: "280px",
      height: "280px",
      backgroundColor: "#0e6adb",
      "& .Icon, & .Text": {
        color: "#ffffff",
      },
    },
  },
  ActionBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px",
  },
  Icon: {
    fontSize: "54px",
    color: "#0e6adb",
  },
  Title: {
    color: "#0e6adb",
    fontWeight: "600",
    fontSize: "18px",
  },
  ActionText: {
    color: "#0e6adb",
    fontWeight: "500",
    fontSize: "16px",
    marginBottom: "12px",
    textTransform: "none"
  },
  ActionIcon: {
    fontSize: "18px",
    marginBottom: "11px",
  },
};
