import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getUniversesWithStarCount, deleteUniverse } from '../../sevices/dataService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';

export default function Universes() {
  const [universes, setUniverses] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [activeUniverseID, setActiveUniverseID] = useState();


  function fetchUniverses() {
    setLoading(true);
    getUniversesWithStarCount()
      .then(res => {
        setUniverses(res);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchUniverses();
  }, []);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalClose = (res) => {
    setOpenModal(false);

    if (res && activeUniverseID) {
      setLoading(true);
      deleteUniverse(activeUniverseID)
        .then(res => {
          fetchUniverses();
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        })

      setActiveUniverseID('');
    }
  }

  const confirmDelete = (id) => {
    setActiveUniverseID(id);
    setOpenModal(true);
  }

  return (
    <React.Fragment>
      <Paper className="d-flex align-items-center mt-3 mb-4 px-3 py-3">
        <h3 className="mb-0 mr-auto">Universes</h3>
        <Button variant="contained" color="primary" component={RouterLink} to="/universes/add"
          startIcon={<Icon>add</Icon>}
        >
          Add
        </Button>
      </Paper>
      {
        loading ? (
          <Backdrop open={true} style={{ zIndex: 1 }} data-testid="loading">
            <CircularProgress color="inherit" />
          </Backdrop>
        ) :
          (
            universes.length > 0 ?
              (
                <React.Fragment>
                  <TableContainer component={Paper} data-testid="universe-table">
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Max. Size</TableCell>
                          <TableCell align="right">Cur. Size</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          (rowsPerPage > 0 ?
                            universes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                            universes
                          ).map(universe => (
                            <TableRow key={universe.id}>
                              <TableCell component="th" scope="row">{universe.name}</TableCell>
                              <TableCell align="right">{universe.maxSize}</TableCell>
                              <TableCell align="right">{universe.curSize}</TableCell>
                              <TableCell align="center">
                                <IconButton color="primary" component={RouterLink} to={`/universes/${universe.id}`}>
                                  <Icon fontSize="default">visibility</Icon>
                                </IconButton>
                                <IconButton color="primary" component={RouterLink} to={`/universes/${universe.id}/edit`}>
                                  <Icon fontSize="default">edit</Icon>
                                </IconButton>
                                <IconButton color="secondary" onClick={() => confirmDelete(universe.id)}>
                                  <Icon fontSize="default">delete</Icon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    component={Paper}
                    count={universes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                  />
                </React.Fragment>
              ) :
              (
                <h5 className="alert alert-danger" data-testid="no-data">No universe found!</h5>
              )
          )
      }
      <ConfirmDialog open={openModal} onClose={handleModalClose} />
    </React.Fragment>
  )
}