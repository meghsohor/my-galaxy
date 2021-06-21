import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { NavLink as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    '&.active': {
      borderBottomColor: '#FFF'
    },
    '&:hover': {
      color: '#FFF'
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" className={`${classes.title} d-flex`}>
          <Icon fontSize="large" className="mr-2">public</Icon>
          My Galaxy
        </Typography>

        <Button className={classes.menuButton} color="inherit" component={RouterLink} to="/universes">Universes</Button>
        <Button className={classes.menuButton} color="inherit" component={RouterLink} to="/stars">Stars</Button>
        <Button className={classes.menuButton} color="inherit" component={RouterLink} to="/imprint">Imprint</Button>
      </Toolbar>
    </AppBar>
  )
}