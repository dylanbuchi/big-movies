import React from 'react';

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {
  AppBar,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';

import {
  Menu,
  AccountCircle,
  Brightness7,
  Brightness4,
} from '@mui/icons-material';

import { MenuButton, StyledToolBar } from './styles';

const NavBar = () => {
  const theme = useTheme();
  const maxWidthStr = '(max-width:600px)';

  const isMobileDevice = useMediaQuery(maxWidthStr);
  const isAuthenticated = false;

  return (
    <AppBar position="fixed">
      <StyledToolBar>
        {isMobileDevice && (
          <MenuButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => {}}
          >
            <Menu />
          </MenuButton>
        )}
        <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobileDevice && 'Search...'}
        <div>
          {!isAuthenticated ? (
            <Button color="inherit" onClick={() => {}}>
              Login &nbsp; <AccountCircle />
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/profile/:id"
              onClick={() => {}}
            >
              {!isMobileDevice && <>My Movies &nbsp; </>}
              <Avatar style={{ width: 30, height: 30 }} alt="Profile" src="" />
            </Button>
          )}

          {isMobileDevice && 'Search...'}
        </div>
      </StyledToolBar>
    </AppBar>
  );
};

export default NavBar;
