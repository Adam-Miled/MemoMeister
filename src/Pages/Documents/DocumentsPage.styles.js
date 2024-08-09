export const styles = {
  CreateButton: {
    bgcolor: "button.primary",
  },
  TitleWrapper: { textAlign: "left", marginBottom: "8px" },
  TitleText: { align: "left", fontWeight: "600", fontSize: "22px" },
  ActionButtons: {
    cursor: "pointer",
    margin: "0 2px",
    fontSize: "22px",
  },
  Modal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'fit-content',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  Inputs: {
    margin: '10px 1px 20px 10px',
    width: '99%',
    '& legend': { display: 'none' },
  },
  EmoticonInput: {
    margin: '10px 1px 20px 10px',
    width: '10%',
    '& legend': { display: 'none' }
  },
  ConfirmButton:{backgroundColor: "#0e6adb", color: "#fff"}
};