import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/AddBoxRounded'
import { Link, withRouter } from 'react-router-dom'
import auth from './../auth/auth-helper'

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2e7d32',
  },
  title: {
    flexGrow: 1,
    fontWeight: 600,
    fontSize: '1.3rem',
    color: '#ffffff',
    textDecoration: 'none'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  iconButton: {
    color: '#ffffff',
    '&.active': {
      color: '#69f0ae',
    },
  },
  navButton: {
    color: '#ffffff',
    '&.active': {
      color: '#69f0ae',
      fontWeight: 600,
    },
    border: '1px solid #fff',
    borderRadius: 20,
    padding: theme.spacing(1, 2),
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#2e7d32',
      fontWeight: 600
    },
    margin: theme.spacing(1)

  },
  actionButton: {
    marginRight: theme.spacing(2),
    border: '1px solid #fff',
    color: '#fff',
    '&.active': {
      backgroundColor: '#ffffff',
      color: '#2e7d32',
      fontWeight: 600,
    },
  },
  rightSection: {
    position: 'absolute',
    right: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  }
}));

const Menu = withRouter(({ history }) => {
  const classes = useStyles();
  const isActive = (path) => history.location.pathname === path;
  const isButtonActive = (path) => history.location.pathname.includes(path);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.title}>
          MERN Expense Tracker
        </Typography>

        <div className={classes.navLinks}>
          <Link to="/">
            <IconButton className={`${classes.iconButton} ${isActive('/') ? 'active' : ''}`}>
              <HomeIcon />
            </IconButton>
          </Link>
          {auth.isAuthenticated() && (
            <>
              <Link to="/expenses/all">
                <Button className={`${classes.navButton} ${isActive('/expenses/all') ? 'active' : ''}`}>
                  Expenses
                </Button>
              </Link>
              <Link to="/expenses/reports">
                <Button className={`${classes.navButton} ${isActive('/expenses/reports') ? 'active' : ''}`}>
                  Reports
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className={classes.rightSection}>
          {!auth.isAuthenticated() && (
            <>
              <Link to="/signup">
                <Button className={`${classes.navButton} ${isActive('/signup') ? 'active' : ''}`}>Sign up</Button>
              </Link>
              <Link to="/signin">
                <Button className={`${classes.navButton} ${isActive('/signin') ? 'active' : ''}`}>Sign In</Button>
              </Link>
            </>
          )}

          {auth.isAuthenticated() && (
            <>
              <Link to="/expenses/new">
                <Button
                  className={`${classes.actionButton} ${isButtonActive('/expenses/new') ? 'active' : ''}`}
                  startIcon={<AddIcon />}
                >
                  Add Expense
                </Button>
              </Link>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <Button className={`${classes.navButton} ${isActive(`/user/${auth.isAuthenticated().user._id}`) ? 'active' : ''}`}>
                  My Profile
                </Button>
              </Link>
              <Button color="inherit" onClick={() => auth.clearJWT(() => history.push('/'))}>
                Sign out
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Menu;