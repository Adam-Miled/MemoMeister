import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  styled,
  TableFooter,
  TableHead,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { styles } from "./FoldersPage.styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import FoldersActionButtons from "../../Components/TableActionButtons/FoldersActionButtons";
import FolderModal from "./FolderModal";
import DeleteDialog from "../../Components/ConfirmationModal/DeleteModal";
import { moveFoldersToBin } from "../../Utilities/FolderUtilities";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0, 0, 0, 0.54)",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Folders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [modifiedFolder, setModifiedFolder] = useState(null);
  const [switchDeleteDialog, setSwitchDeleteDialog] = useState(false);
  const [folders, setFolders] = useState(JSON.parse(localStorage.getItem("folders"))|| []);

  const handleSwitchDeleteDialog = (selectedRow) => {
    setModifiedFolder(selectedRow);
    setSwitchDeleteDialog(!switchDeleteDialog);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateFolder = () => {
    setMode("Erstellen");
    handleOpen();
  };

  const handleEditFolder = (selectedRow) => {
    setModifiedFolder(selectedRow);
    setMode("Bearbeiten");
    handleOpen();
  };

  const handleDelete = () => {
    if (modifiedFolder.id !== null) {
      moveFoldersToBin(modifiedFolder.id)
      .then((success) => {
        const updatedFolders = folders.filter((folder) => folder.id !== modifiedFolder.id);
        
        localStorage.setItem("folders", JSON.stringify(updatedFolders));
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error in handleDelete:", error);
      });
  }
};

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - folders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid sx={styles.TitleWrapper}>
        <Typography variant="h6" sx={styles.TitleText}>
          Ordner
        </Typography>
      </Grid>
      <Grid container rowSpacing={0}>
        <Grid item xs={6} align="left">
          <Typography>
            Es werden {folders?.length} gefilterte Datensätze angezeigt.
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Button
            variant="contained"
            sx={styles.CreateButton}
            startIcon={<AddIcon />}
            onClick={() => handleCreateFolder()}
          >
            Ordner Erstellen
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ mt: 1, mb: 1 }} />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Beschreibung</StyledTableCell>
                <StyledTableCell align="left">Labels</StyledTableCell>
                <StyledTableCell align="left">EmoteIcon</StyledTableCell>
                <StyledTableCell align="left">Aktionen</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? folders.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : folders
              ).map((folder, index) => (
                <StyledTableRow key={folder?.id}>
                  <StyledTableCell component="th" scope="row">
                    {folder?.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{folder?.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    {folder?.description}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {folder?.labels.join(", ")}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {folder?.emoteIcon || "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <FoldersActionButtons
                      onDelete={() => handleSwitchDeleteDialog(folder)}
                      onEdit={() => handleEditFolder(folder)}
                      onSetLocation={() => console.log(folder)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={folders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
      <Grid>
        <DeleteDialog
          modalType="einen Ordner"
          open={switchDeleteDialog}
          setOpen={handleSwitchDeleteDialog}
          deleteModal={handleDelete}
        />
        <FolderModal
          modifiedFolder={mode === "Bearbeiten" ? modifiedFolder : null}
          mode={mode}
          open={open}
          handleClose={handleClose}
          folders={folders}
          setFolders={setFolders}
        />
      </Grid>
    </>
  );
}

export default Folders;
