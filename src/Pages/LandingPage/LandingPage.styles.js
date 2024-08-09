export const styles = {
  FullScreenDiv: {
    margin: 0,
    padding: 0,
    width: "100vw",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px",
  },
  Overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  standardBox: {
    width: "380px",
    height: "420px",
    zIndex: 1,
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  outlineButton: {
    width: "100px",
    height: "38px",
    borderRadius: "12px",
    border: "2px solid #0e6adb",
    padding: "4px",
    color: "#0e6adb",
    fontWeight: "600",
    marginBottom: "20px",
    transition: "background-color 0.2s, border 0.1s, color 0.1s",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#0e6adb",
    },
  },
  solidButton: {
    width: "100px",
    height: "38px",
    borderRadius: "12px",
    padding: "4px",
    color: "#ffffff",
    backgroundColor: "#0e6adb",
    fontWeight: "600",
    marginBottom: "20px",
    transition: "background-color 0.2s, border 0.1s, color 0.1s",
    "&:hover": {
      color: "#0e6adb",
      backgroundColor: "transparent",
      border: "2px solid #0e6adb",
    },
  },
  inputField: {
    width: "100%",
    borderRadius: "12px",
  },
  PageMarker: {
    zIndex: 99999,
    width: "200px",
    position: "absolute",
    left: "20px",
    bottom: "32px",
  },
};