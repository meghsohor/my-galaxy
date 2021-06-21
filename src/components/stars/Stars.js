import React, { useEffect, useState } from 'react';
import { getStarsWithUniverseName, deleteStar } from '../../sevices/dataService';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link as RouterLink } from 'react-router-dom';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';

export default function Stars() {
  const [stars, setStars] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeStarID, setActiveStarID] = useState();

  function fetchStars() {
    setLoading(true);
    getStarsWithUniverseName()
      .then(res => {
        //console.log(res);
        setStars(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchStars();
  }, [])

  function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalClose = (res) => {
    setOpenModal(false);

    if (res && activeStarID) {
      setLoading(true);
      deleteStar(activeStarID)
        .then(res => {
          fetchStars();
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        })

      setActiveStarID('');
    }
  }

  const confirmDelete = (id) => {
    setActiveStarID(id);
    setOpenModal(true);
  }

  return (
    <React.Fragment>
      <Paper className="d-flex align-items-center mt-3 mb-4 px-3 py-3">
        <h3 className="mb-0 mr-auto">Stars</h3>
        <Button variant="contained" color="primary" component={RouterLink} to="/stars/add"
          startIcon={<Icon>add</Icon>}
        >
          Add
        </Button>
      </Paper>
      {
        loading ? (
          <Backdrop open={true} style={{ zIndex: 1 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) :
          (
            stars.length > 0 ?
              (
                <React.Fragment>
                  <TableContainer component={Paper}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Color</TableCell>
                          <TableCell>Universe</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          (rowsPerPage > 0 ?
                            stars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                            stars
                          ).map(star => (
                            <TableRow key={star.id}>
                              <TableCell component="th" scope="row">{star.name}</TableCell>
                              <TableCell align="center">
                                <Icon fontSize="large" style={{ color: star.color }}>star</Icon>
                              </TableCell>
                              <TableCell>{star.universe}</TableCell>
                              <TableCell align="center">
                                <IconButton color="primary" component={RouterLink} to={`/stars/${star.id}`}>
                                  <Icon fontSize="default">visibility</Icon>
                                </IconButton>
                                <IconButton color="primary" component={RouterLink} to={`/stars/${star.id}/edit`}>
                                  <Icon fontSize="default">edit</Icon>
                                </IconButton>
                                <IconButton color="secondary" onClick={() => confirmDelete(star.id)}>
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
                    count={stars.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                  />
                </React.Fragment>
              ) :
              (
                <h5 className="alert alert-danger">No star found!</h5>
              )
          )
      }
      <ConfirmDialog open={openModal} onClose={handleModalClose} />
    </React.Fragment>
  )
}