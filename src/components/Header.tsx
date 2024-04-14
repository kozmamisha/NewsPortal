import { FC, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AccountCircle, ExitToApp, Menu as MenuIcon } from '@mui/icons-material';
import { TfiWorld } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';

const Header: FC = () => {
  const isLoggedIn = useAuth();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('You logged out!');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
              <TfiWorld />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white' }} component={Link} to="/">
              News Portal
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={toggleDrawer} aria-label="menu">
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }} alignItems="center">
              <Button
                sx={{
                  color: location.pathname === '/' ? '#fff' : '#bbb',
                }}
                color="inherit"
                component={Link}
                to="/">
                Home
              </Button>
              <Button
                sx={{
                  color: location.pathname === '/news' ? '#fff' : '#bbb',
                }}
                color="inherit"
                component={Link}
                to="/news">
                News
              </Button>
              <Button
                sx={{
                  color: location.pathname === '/categories' ? '#fff' : '#bbb',
                }}
                color="inherit"
                component={Link}
                to="/categories">
                Categories
              </Button>
            </Box>
            {!isMobile && (
              <>
                {isLoggedIn ? (
                  <Button
                    sx={{ ml: 2 }}
                    variant="contained"
                    color="error"
                    startIcon={<ExitToApp />}
                    component={Link}
                    onClick={logoutHandler}
                    to="/">
                    Log Out
                  </Button>
                ) : (
                  <Button
                    sx={{ ml: 2 }}
                    variant="outlined"
                    color="inherit"
                    startIcon={<AccountCircle />}
                    component={Link}
                    to="/auth">
                    Log In / Sign Up
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button onClick={toggleDrawer} component={Link} to="/">
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem button onClick={toggleDrawer} component={Link} to="/news">
            <ListItemText>News</ListItemText>
          </ListItem>
          <ListItem button onClick={toggleDrawer} component={Link} to="/categories">
            <ListItemText>Categories</ListItemText>
          </ListItem>
          {isLoggedIn ? (
            <ListItem button onClick={logoutHandler}>
              <ListItemText>Log Out</ListItemText>
            </ListItem>
          ) : (
            <ListItem button onClick={toggleDrawer} component={Link} to="/auth">
              <ListItemText>Log In / Sign Up</ListItemText>
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
