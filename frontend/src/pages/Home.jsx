import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, CssBaseline, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Verses from '../components/Verses';
import SurahDrawer from '../components/SurahDrawer';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [surahId, setSurahID] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleListItemClick = (surahId) => () => {
    setSurahID(surahId);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    navigate("/logout")
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Quran Reader
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <SurahDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} handleClick={handleListItemClick} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: 8 }}
      >
        {surahId === 0 ? <></> : (<Verses surahId={surahId} />)}
      </Box>
    </Box>
  );
}

export default Home;
